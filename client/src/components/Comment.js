import { useEffect, useState } from "react"
import axiosAuth from "../axios/axiosAuth";
import axiosCommentDelete from "../axios/axiosCommentDelete";
import axiosCommentUpdate from "../axios/axiosCommentUpdate";
import "../components/css/Comment.css";
const Comment = (props) =>{
    const [mode, setMode]= useState("view");
    const [content, setContent] = useState("");
    const [commentData, setCommentData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [editButtonToggle, setEditButtonToggle] = useState(false);

    useEffect(()=>{
        setCommentData(props.commentData);
        setIsAdmin(props.admin);
        setContent(props.commentData.commentDetail);
        if(props.admin){
            setEditButtonToggle(true);
        }else if(!props.commentData.isAnony){
            if(JSON.parse(localStorage.getItem("token")) && JSON.parse(localStorage.getItem("token")).id === props.commentData.commentId){
                setEditButtonToggle(true);
            }else{
                setEditButtonToggle(false);
            }
        }else{
            setEditButtonToggle(false);
        }
    },[props])

    const onToggleHandler = () =>{
        if(mode === "view"){
            setMode("edit");
        }else{
            setMode("view");
        }
    }

    const onDeleteHandler = () =>{
        if(window.confirm("삭제 하시겠습니까?")){
            if(!isAdmin){
                const userToken = JSON.parse(localStorage.getItem("token"));
                const authRes = axiosAuth({
                    id : userToken.id,
                    index : commentData.commentIndex,
                    token : userToken.value,
                    cate : "comment",
                    isSignin : true,
                    isEdit : true
                })
                authRes.then(data =>{
                    if(!data.signinAuth || !data.editAuth){
                        alert("권한이 없습니다.");
                        return window.location.reload();
                    }
                })
            }
            const deleteData = {
                commentIndex : commentData.commentIndex,
            }
            const res = axiosCommentDelete(deleteData);
            res.then(data =>{
                alert(data.msg);
                window.location.reload();
            })
        }
    }

    const onUpdateHandler = () =>{
        if(!isAdmin){
            const userToken = JSON.parse(localStorage.getItem("token"));
            const authRes = axiosAuth({
                id : userToken.id,
                index : commentData.commentIndex,
                token : userToken.value,
                cate : "comment",
                isSignin : true,
                isEdit : true
            })
            authRes.then(data =>{
                if(!data.signinAuth || !data.editAuth){
                    alert("권한이 없습니다.");
                    return window.location.reload();
                }
            })
        }
        const updateData = {
            commentIndex : commentData.commentIndex,
            commentDetail : content
        }
        const res = axiosCommentUpdate(updateData);
        res.then(data =>{
            alert(data.msg);
            window.location.reload();
        })
    }

    const contentUI = {
        "view" : <div>{content}</div>,
        "edit" : <textarea value={content} onChange={(e)=>{ setContent(e.target.value) }}></textarea>
    }
    const buttonUI = {
        "view" : "수정",
        "edit" : "취소"
    }

    return(
        <div className="commentBox">
            <div className="commentTitle">
                {commentData.isAnony ? "익명" : `${commentData.commentNick}(${commentData.commentId ? commentData.commentId.slice(0,Math.ceil(commentData.commentId.length/2))+
            "*".repeat(commentData.commentId.length - Math.ceil(commentData.commentId.length/2)) : commentData.commentId})`}
                {editButtonToggle ?
                <div className="commentButtons">
                    <button onClick={onToggleHandler}>{buttonUI[mode]}</button>
                    <button onClick={onDeleteHandler}>삭제</button>
                </div>
                 : null}
            </div>
            <div className="commentMain">
                { contentUI[mode] }
            </div>
            {mode ==="edit" ? <button onClick={onUpdateHandler}>수정</button> : null}
        </div>
    )
}

export default Comment;