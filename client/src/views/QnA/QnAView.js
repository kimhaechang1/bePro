import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axiosBoardView from '../../axios/axiosBoardView';
import HashTag from '../../components/HashTag';
import axiosAuth from '../../axios/axiosAuth';
import Comment from '../../components/Comment';
import './css/QnAView.css';
import axiosComment from '../../axios/axiosComment';

const QnAView = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const [content, setContent] = useState({});
    const [hashTag, setHashTag] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
    const [userCommentData, setUserCommentData] = useState("");
    const [isInputAnonyActive, setIsInputAnonyActive] = useState(false);
    const [isAnony, setIsAnony] = useState(1);


    useEffect(()=>{
        const res = axiosBoardView(params.id, "qna");
        res.then(data=>{
            if(data.length === 0){
                navigate("/404");
            }
            setContent(data);
            setHashTag(data.tags);
            if(JSON.parse(localStorage.getItem("token"))){
                const userId = JSON.parse(localStorage.getItem("token")).id;
                if(data.uploaderId === userId){
                    setIsEditable(true);
                }
            }
        })
        if(JSON.parse(localStorage.getItem("token"))){
            const userToken = JSON.parse(localStorage.getItem("token"));
            const resOfAuth = axiosAuth({
                id : userToken.id,
                token : userToken.value,
                isSignin : true,
                isAdmin : true
            })
            resOfAuth.then(data =>{
                if(data.signinAuth){
                    setIsAnony(false);
                    setIsInputAnonyActive(true);
                    if(data.adminAuth){
                        setIsEditable(true);
                        setIsCurrentUserAdmin(true);
                    }
                }else{
                    setIsAnony(true);
                    setIsInputAnonyActive(false);
                }
            })
        }
    },[])

    

    const onClickHandler = () =>{
        navigate('/write?board=qna&type=edit', {
            state:{
                data : content,
                isCurrentUserAdmin : isCurrentUserAdmin
            }
        })
    }
    
    const onCommentSubmitHandler = () =>{
        if(isAnony){
            if(!window.confirm("?????? ????????? ??????/?????? ??? ??? ????????????.\n ?????? ???????????????????")){
                return;
            }
        }
        const newComment = {
            id : content.id,
            commentDetail : userCommentData,
            isAnony : isAnony,
            commentNick : "",
            commentId : ""
        }
        if(JSON.parse(localStorage.getItem("token"))){
            const userToken = JSON.parse(localStorage.getItem("token"));
            newComment['commentNick'] = userToken.nick;
            newComment['commentId'] = userToken.id;
        }
        const res =  axiosComment(newComment);
        res.then(data =>{
            alert(data.msg);
            window.location.reload();
        })
        
    }

    return (
        <div>
            { isEditable ? <input onClick={onClickHandler} value="?????????" type="button"/> : null}
            <div>?????? : {content.title}</div>
            <div className="tagArea" id="tags">
                ?????? : { hashTag ? hashTag.map(name =>(<HashTag forDelTag={hashTag} forView={true} setHashTag={setHashTag} tagName={name} key={name}>{name}</HashTag>) ) : null }
            </div>
            <div>?????? : {content.detail}</div>
            <div>???????????? : {content.uploadtime}</div>
            <div>????????? : {content.uploaderNick}</div>
            <div>????????? ????????? : { content.uploaderId ? content.uploaderId.slice(0,Math.ceil(content.uploaderId.length/2))+
            "*".repeat(content.uploaderId.length - Math.ceil(content.uploaderId.length/2)) : content.uploaderId}</div>
            <div>????????? : {content.view}</div>
            <div>????????? : {content.like}</div>
            <hr/>
            <div>isInputAnonyActive : {isInputAnonyActive ? "true" : "false"}</div>
            <div>isAnony : {isAnony ? "true" : "false"}</div>
            <div className = "commentWriteArea">
                <div className ="commentWriteFrame">
                    <div className="commentWriteHeader">
                        {isInputAnonyActive ? <div><input type="checkbox" value={isAnony} onChange={(e)=>{
                            if(isAnony){
                              setIsAnony(false);  
                            }else{
                              setIsAnony(true);
                            }
                        }} 
                        ></input>??????</div> : <div>??????</div>}
                    </div>
                    <div className="commentWriteContent">
                        <textarea rows="2" value={userCommentData} onChange={(e)=>{setUserCommentData(e.target.value)}}></textarea>
                        <button onClick={onCommentSubmitHandler}>??????</button>
                    </div>
                    
                </div>
            </div>
            {content.comment ? 
                (content.comment).map((value) => {return <Comment commentData={value} admin={isCurrentUserAdmin} />}) 
           : null}
        </div>
    )
}
export default QnAView;