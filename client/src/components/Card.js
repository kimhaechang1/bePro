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
            content.map((el, index)=>{
              return (
                <div className="cardElement">
                  <div onClick={()=>{navigate(`/${boardType}/${el['id']}`)}} className="cardContentTitle" key={el.id}>제목 : {el.title}|조회수 : {el.view}|글쓴 날짜 : { el.uploadtime }</div> 
                  { props.referrer === "mypage" ?
                  <button onClick={()=>{navigate(`/write?board=${boardType}&type=edit`,{
                    state : {
                      data : el,
                      isCurrentUserAdmin : props.isCurrentUserAdmin
                    }
                  })}}>수정</button> 
                  : null}
                </div>
              )
            }) : 
            <div>
              { props.referrer ==="search" ? 
              <>
                <div>검색결과가 없어요!</div>
                <div>다른 검색어나 태그로 검색 해 보세요.</div>
              </> : props.referrer ==="mypage" ? 
              <>
                <div>아직 글을 쓴적이 없네요!</div>
                <div>상단바에 글쓰기를 통해 자유롭게 글을 써 보세요</div>
              </> : props.referrer === "main" ? 
              <>
                <div>bePro는 여러분의 글을 기다리고 있어요</div>
              </> : null
              }
            </div>}
          </div>
        </div>
  )
}
export default Card;