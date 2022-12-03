import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosGetQnATitle from "../../axios/axiosGetQnATitle";
import { useNavigate } from "react-router-dom";

const QnABoardList = () =>{
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const example = [
        {
             "name" : "김회창",
             "age" : 25,
             "dev" : "front-end"
         },
        {
             "name" : "김승민",
             "age" : 25,
             "dev" : "back-end"
         },
        {
             "name" : "황요새",
             "age" : 25,
             "dev" : "front-end"
        }    
    ]
    useEffect(()=>{
        const res = axiosGetQnATitle("board");
        res.then(data =>{
            setList(data);
        }).catch(err =>{
            setList(example)
        })
    },[])
    const onClickHandler = ()=>{
        console.log(list)
    }
    return(
        <div style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            <button onClick={onClickHandler} style={{width:"fit-content"}}>test</button>
            {
            list.map((data, index)=>{
                return (
                    <div onClick={()=>{
                        navigate(`/qna/${data['index']}`,{state:{
                            "title" : data['title'],
                            "tag" : data['tag'],
                            "context" : data['context'],
                            "views" : data['views'],
                            "date" : data['date'],
                            "index" : data['index']
                        }})
                    }} style={{cursor:"pointer"}}>{index+1}. {data['title']}</div>
                )
            })
            }
            {/**<Link to={`/qna/${data['index']}`}>{data['title']}</Link> */}
        </div>
        
    )
}
export default QnABoardList;