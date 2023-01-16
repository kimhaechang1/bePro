import {useState, useEffect} from 'react';
import axiosGetHashTag from '../axios/axiosGetHashTag';
import '../components/css/SearchDropDown.css';

function SearchDropDown(props){
    const [supportData, setSupportData]= useState([]);
    useEffect(() => {
      const value = axiosGetHashTag();
      if(props.inputValue.length > 1){  
        value.then(data =>{
          setSupportData( data.filter((
            (bit)=>{
              return (bit.name).includes(props.inputValue);
            }
          )))
        })
      }else{
        setSupportData([]);
      }
    }, [props])
    const onClickHandler = (e) =>{
      const tags = [...props.forAppendHashTag];
      if(tags.includes(e.target.innerText)){
        return alert("중복된 태그가 존재합니다.");
      }
      props.setHashTag([...props.forAppendHashTag, e.target.innerText]);
      props.forDelText("");
    }
    return(
        <div key={"dropdown"} className="dropDownBox">
            {supportData.map((data, index)=>{
                return(
                    <div className="dropDownElement" key={data.name} onClick={onClickHandler}>{data.name}</div>
                )
            })}
        </div>
    )
}
export default SearchDropDown;