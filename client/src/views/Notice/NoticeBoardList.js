import {useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axiosBoardList from "../../axios/axiosBoardList";
const NoticeBoardList = () =>{
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    useEffect(()=>{
        const res = axiosBoardList("notice");
        res.then(data =>{
            setList(data);
        })
    },[])
    return (
        <div style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            {
            list.map((data, index)=>{
                return (
                    <div onClick={()=>{
                        navigate(`/notice/${data['id']}`);
                    }} style={{cursor:"pointer"}}>{index+1}. {data['title']}</div>
                )
            })
            }
        </div>
    )
}
export default NoticeBoardList;