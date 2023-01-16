import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosBoardList from "../../axios/axiosBoardList";
import Page from "../../components/Page";

const QnABoardList = () =>{
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [maxPage] = useState(5);
    const [limit] = useState(15);  
    const [currentPage, setCurrentPage] = useState();
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        setCurrentPage(parseInt(searchParams.get("page")));
        //const res = axiosGetQnATitle("board");
        const res = axiosBoardList("qna");
        res.then( data =>{
            setList(data);
        })
    },[searchParams])
    return(
        <>
        <div style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            {
            list.slice(0+((currentPage)-1)*(limit),(limit*currentPage)).map((data, index)=>{
                return (
                    <div onClick={()=>{
                        navigate(`/qna/${data['id']}`);
                    }} style={{cursor:"pointer"}}>{data['title']}</div>
                )
            })
            }
        </div>
        <div className="PageArea">
            <Page query={"page"} maxPage={maxPage} limit={limit} total={list.length}/>
        </div>
        </>
    )
}
export default QnABoardList;