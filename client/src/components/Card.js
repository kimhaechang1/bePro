import {useEffect, useState} from 'react'
import bindCardContent from '../axios/binds/bindCardContent';


const Card = (props) => {
    const [title, setTitle] = useState("");
    const [contentTitle, setContentTitle] = useState([]);
    useEffect(() => {
      setTitle(props.name);
      const bindedMethod = bindCardContent(props.name);
      const result = bindedMethod();
      result.then(data=>{
        setContentTitle(data);
      })
      /* 백엔드 통신 */ 
      // eslint-disable-next-line default-case
    },[props.name])
    return (
        <div className="card">
          <div className="cardTitle">{title}</div>
          <div className="cardDetail">
            {contentTitle.map((data, index)=>{
              return <div key={index}>제목 : {data.title}|조회수 : {data.views}|글쓴 날짜 : { new Date(data.date).toLocaleDateString() }</div>
            })}
          </div>
        </div>
  )
}
export default Card;