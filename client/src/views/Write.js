import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import HashTag from "../components/HashTag";
import axiosPost from "../axios/axiosPost";
import axiosPostUpdate from "../axios/axiosPostUpdate";
import axiosAuth from "../axios/axiosAuth";
import './css/Write.css';

const Write = (props)=>{
    const [contentTitle, setContentTitle] = useState("");
    const [allData, setAllData] = useState({});

    const [tag, setTag] = useState([]);
    const [context, setContext] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [board, setBoard] = useState("");
    
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("token"))||(!location.state.isCurrentUserAdmin && searchParams.get("board")==="notice") || !location.state){
            alert("권한이 없습니다.");
            return navigate(-1);
        }
        const locData = location.state.data;
        const isCurUserAdmin = location.state.isCurrentUserAdmin;
        setAllData(locData);
        setIsAdmin(isCurUserAdmin);
        setType(searchParams.get("type"));
        setBoard(searchParams.get("board"));

        if(searchParams.get("type")==="edit"){
            setContentTitle(locData.title);
            setContext(locData.detail);
            setTag(locData.tags);
        }else if(searchParams.get("type")==="new"){
            setContentTitle("");
            setContext("");
            setTag([]);
        }
        if(searchParams.get("board")==="notice"){
            setTitle("공지사항");
            
        }else if(searchParams.get("board")==="qna"){
            setTitle("QnA");
        }
        // 게시판 늘어날때 추가 해야 할 부분 : 게시판 제목
    },[searchParams, location.state])
    
    
    const onEnterKeyUpHandler = (e)=>{
        if(e.keyCode ===13 && e.target.value.length>1){
            const cp = [...tag];
            if(cp.includes(e.target.value)){
                alert("중복된 태그가 이미 존재합니다.");
                return;
            }
            cp.push(e.target.value);
            setTag(cp);
            e.target.value="";
        }
    }

    const onClickHandler = (e)=>{
        e.preventDefault();
        if(!JSON.parse(localStorage.getItem("token"))){
            return alert("로그아웃 상태입니다.");
        }
        let resMsg = null;
        const userToken = JSON.parse(localStorage.getItem("token"));
        const body = {
            "title" : contentTitle,
            "tag" : [...tag],
            "detail" : context,
            "uploaderId" : userToken.id
        }
        if(board ==="qna" && type ==="edit"){
            if(!isAdmin){
                const auth = axiosAuth({
                    id : userToken.id,
                    token : userToken.value,
                    index : allData.id,
                    isSignin : true,
                    cate : "post",
                    isEdit : true
                })
                auth.then(data =>{
                    if(!data.signinAuth || !data.editAuth){
                        return alert("권한이 없습니다.");
                    }        
                })
            }
            body['id'] = allData.id;
            const resQnAEdit = axiosPostUpdate(body, board);
            resMsg = resQnAEdit;
            
        }else if(board ==="qna" && type ==="new"){
            const resQnANew = axiosPost(body, board);
            resMsg = resQnANew;
        }else if(board ==="notice"){
            if(!isAdmin){
                return alert("권한이 없습니다.");
            }
            if(type ==="edit"){
                body['id'] = allData.id;
                const resNotiEdit = axiosPostUpdate(body, board);
                resMsg = resNotiEdit;
            }else if(type ==="new"){
                const resNotiNew = axiosPost(body, board);
                resMsg = resNotiNew;
            }
        }
        resMsg.then(data=>{
            alert(data.msg);
            if(type==="edit"){
                navigate(`/${board}/${allData.id}`);
            }else{
                navigate(`/${board}`);
            }
            
        })
    }


    return(
        <div className="App">
        <div className="mainContentFrame">
          <div className="innerArea border">
            <div className="contentFrame writeFrame">
            
                <div>{title} 게시글 작성</div>
                    <div>
                        <div>
                            <div>제목</div><input type="text" value={contentTitle} onChange={(e)=>{setContentTitle(e.target.value)}} name="contentTitle" required/>
                        </div>
                        { title === "QnA" ? 
                        <div className="tagFrame">
                           <div className="tagArea" id="tags">
                                { tag.length > 0 ? tag.map(name =>(<HashTag forDelTag={tag} setHashTag={setTag} tagName={name} key={name}>{name}</HashTag>) ) : null }
                            </div> 
                            <input className="tagInput" type="text" placeholder="태그를 입력해주세요" onKeyUp={onEnterKeyUpHandler} name="contentTitle"/>
                        </div>
                        : null
                        }
                        <div>
                            <div>내용</div><textarea cols="24" rows="8" value={context} onChange={(e)=>{setContext(e.target.value)}} type="text" name="contentTitle" required/>
                        </div>
                    </div>
                    <div>
                        <input onClick={onClickHandler} value="submit" type="submit"/>
                    </div>
            </div>
          </div>
        </div>
      </div>
    )    
}
export default Write;