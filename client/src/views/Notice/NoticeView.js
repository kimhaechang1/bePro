import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axiosBoardView from '../../axios/axiosBoardView';
import HashTag from '../../components/HashTag';
import axiosAuth from '../../axios/axiosAuth';
const NoticeView = () =>{
    const navigate = useNavigate();
    const params = useParams();
    const [content, setContent] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
    useEffect(()=>{
        const res= axiosBoardView(params.id, "notice");
        res.then(data=>{
            if(data.length === 0){
                navigate("/404");
            }
            setContent(data);
            if(JSON.parse(localStorage.getItem("token"))){
                const userToken = JSON.parse(localStorage.getItem("token"));
                const resOfAuth = axiosAuth({
                    id : userToken.id,
                    token : userToken.value,
                    isSignin : true,
                    isAdmin : true
                })
                resOfAuth.then(data =>{
                    if(data.adminAuth && data.signinAuth){
                        setIsEditable(true);
                        setIsCurrentUserAdmin(true);
                    }
                })
            }
        })
    })
    const onClickHandler = () =>{
        navigate("/write?board=notice",{
            state : {
                type : "edit",
                data : content,
                board : "notice",
                isCurrentUserAdmin : isCurrentUserAdmin
            }
        })
    }
    return (
        <div>
            { isEditable ? <input onClick={onClickHandler} value="글수정" type="button"/> : null}
            <div>제목 : {content.title}</div>
            <div>내용 : {content.detail}</div>
            <div>글쓴날짜 : {content.uploadtime}</div>
            <div>글쓴이 : {content.uploaderNick}</div>
            <div>글쓴이 아이디 : {content.uploaderId}</div>
            <div>조회수 : {content.view}</div>
            <div>좋아요 : {content.like}</div>
        </div>
    )
}

export default NoticeView;