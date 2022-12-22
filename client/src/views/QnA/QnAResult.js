import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QnAResult = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    useEffect(()=>{
        setList(location.state.content);
    })
    console.log(list);
    return (
        <div style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            <div>검색결과 페이지입니다.</div>
            <div>
            {
            list.map((data, index)=>{
                return (
                    <div onClick={()=>{
                        navigate(`/qna/${data['id']}`,{state:{
                            obj : data
                        }})
                    }} style={{cursor:"pointer"}}>{index+1}. {data['title']}</div>
                )
            })
            }
        </div>
            { list ? 
            list.map((data)=>{
                
                return (
                    <div style={{marginBottom:"10px"}}>
                        <div>게시판 : {data.category} </div>
                        <div>제목 : {data.title}</div>
                        <div>태그 : {data.tags.join(",")}</div>
                        <div>인덱스번호 : {data.id}</div>
                        <div>좋아요 수 : {data.like}</div>
                        <div>글쓴이 닉네임 : {data.uploaderId}</div>
                        <div>글쓴 시간 : {data.uploadtime}</div>
                        <div>조회수 : {data.view}</div>

                    </div >
                
                )
            }) : <div>검색결과가 없습니다.</div> }
        </div>
    )
    
}

export default QnAResult;