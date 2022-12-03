import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import HashTag from '../../components/HashTag';

const QnAView = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const obj = location.state
    const [hashTag, setHashTag] = useState([]);
    
    useEffect(()=>{
        setHashTag(obj.tag)
    },[])

    const onClickHandler = () =>{
        navigate('/write',{state:{ type:"edit", data:obj, board:"qna"}})
    }
    return (
        <div>
            <input value="글수정" onClick={onClickHandler} type="button"/>
            <div>{obj.index}. 번글</div>
            <div>제목 : {obj.title}</div>
            <div className="tagArea" id="tags">
                태그 : { hashTag.length > 0 ? hashTag.map(name =>(<HashTag forDelTag={hashTag} forView={true} setHashTag={setHashTag} tagName={name} key={name}>{name}</HashTag>) ) : null }
            </div>
            <div>내용 : {obj.context}</div>
            <div>글쓴날짜 : {obj.date}</div>
            <div>조회수 : {obj.views}</div>
        </div>
    )
}
export default QnAView;