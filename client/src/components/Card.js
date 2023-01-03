import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import bindCardContent from '../axios/binds/bindCardContent';

const Card = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState([]);
    const [boardType, setBoardType] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
      setTitle(props.name);
      const obj = bindCardContent(props.name);
      setBoardType(obj.boardType);
      if(obj.method){
        const method =obj.method;
        method(obj.boardType)
        .then( data =>{
          setContent(data);
        })
      }else{
        if(props.referrer==="search"){
          setTitle(`${props.name} ${props.data.length} 건`);
        }
        setContent(props.data);
      }
      
    },[props.name,props.data,props.referrer])

    const onLinkHandler = (e) =>{
      if(e.target.innerHTML !== "조회수 높은 순"){
        navigate(`/${boardType}`);
      }
    }

    return (
        <div className="card">
          <div onClick={ onLinkHandler} className="cardTitle">{title}</div>
          <div className="cardDetail">
            {content.length > 0 ? 
            content.map((data, index)=>{
              return <div onClick={()=>{navigate(`/${boardType}/${data['id']}`)}} className="cardContentTitle" key={data.id}>제목 : {data.title}|조회수 : {data.view}|글쓴 날짜 : { data.uploadtime }</div>
            }) : 
            <div>
              <div>검색결과가 없어요!</div>
              <div>다른 검색어나 태그로 검색 해 보세요.</div>
            </div>}
          </div>
        </div>
  )
}
export default Card;