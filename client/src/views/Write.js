import { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import HashTag from "../components/HashTag";
import axiosPost from "../axios/axiosPost";
import axiosPostUpdate from "../axios/axiosPostUpdate";
import axiosAuth from "../axios/axiosAuth";

const Write = (props)=>{
    const [contentTitle, setContentTitle] = useState("");
    const [tag, setTag] = useState([]);
    const [context, setContext] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [title, setTitle] = useState("");
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const obj = location.state.data;

    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("token"))){
            alert("로그아웃 상태입니다.");
            return navigate(-1);
        }
        setIsAdmin(location.state.isCurrentUserAdmin);
        if(obj){
            setContentTitle(obj.title);
            setContext(obj.detail);
            setTag(obj.tags);
        }
        if(!location.state.isCurrentUserAdmin && location.state.board==="notice"){
            alert("권한이 없습니다.");
            return navigate(-1);
        }
        if(searchParams.get("board")==="notice"){
            setTitle("공지사항");
        }else if(searchParams.get("board")==="qna"){
            setTitle("QnA");
        }
        // 게시판 늘어날때 추가 해야 할 부분 : 게시판 제목
    },[searchParams.get("board")])
    
    
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
        const userToken = JSON.parse(localStorage.getItem("token"));
        const body = {
            "title" : contentTitle,
            "tag" : [...tag],
            "detail" : context,
            "uploaderId" : userToken.id
        }
        if(location.state.board ==="qna"){
            if(location.state.type ==="edit"){
                const auth = axiosAuth({
                    id : userToken.id,
                    token : userToken.value,
                    index : obj.id,
                    isSignin : true,
                    cate : "post",
                    isEdit : true
                })       
                auth.then(data =>{
                    if(data.signinAuth && data.editAuth){
                        body['id'] = obj.id;
                        const resQnAEdit = axiosPostUpdate(body, location.state.board);
                        resQnAEdit.then(data =>{
                            alert(data.msg);
                        })
                    }else{
                        alert("권한이 없습니다.");
                        return navigate(-1);
                    }
                })
            }
            else if(location.state.type==="new"){
                const resQnANew = axiosPost(body, location.state.board);
                resQnANew.then(data=>{
                    alert(data.msg);
                })
            }
        /*const userId = JSON.parse(localStorage.getItem("token")).id;
        
        if(location.state.type==="edit"){
            body['id'] = obj.id;
            const resEdit = axiosPostUpdate(body,location.state.board);
            resEdit.then(data => {
                alert(data.msg);
            })
        }else if(location.state.type==="new"){
            console.log(body);
            const resNew = axiosPost(body,location.state.board);
            
            resNew.then( data => {
                console.log(data.err);
                alert(data.msg);
            })  
        }*/
        }else if(location.state.board ==="notice"){
            if(!isAdmin){
                return alert("권한이 없습니다.");
            }else{
                if(location.state.type ==="edit"){
                    body['id'] = obj.id;
                    const resNotiEdit = axiosPostUpdate(body, location.state.board);
                    resNotiEdit.then(data =>{
                        alert(data.msg);
                    })
                }else if(location.state.type ==="new"){
                    const resNotiNew = axiosPost(body, location.state.board);
                    resNotiNew.then(data =>{
                        alert(data.msg);
                    })
                }
            }
        }
    }


    return(
        <div className="App">
        <Header/>
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
                        
                        {obj ? <div>{obj.id}</div> : null}
                    </div>
            </div>
          </div>
        </div>
      </div>
    )    
}
export default Write;