import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBoardList from "../../axios/axiosBoardList";

const QnABoardList = () =>{
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    useEffect(()=>{
        //const res = axiosGetQnATitle("board");
        const res = axiosBoardList("qna");
        res.then( data =>{
            setList(data);
        })
    },[])
    return(
        <div style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            {
            list.map((data, index)=>{
                return (
                    <div onClick={()=>{
                        navigate(`/qna/${data['id']}`);
                    }} style={{cursor:"pointer"}}>{index+1}. {data['title']}</div>
                )
            })
            }
        </div>
    )
}
export default QnABoardList;