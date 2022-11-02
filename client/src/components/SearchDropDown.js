import {useState, useEffect} from 'react';
import hashtag from '../components/hashtag.json';
function SearchDropDown(props){
    const [supportData, setSupportData]= useState([]);
    useEffect(() => {
      if(props.major.length > 1){
        const value = hashtag;
        setSupportData(value.filter((data)=>{
            return (data.name).includes(props.major);
        }))
      }else{
        setSupportData([]);
      }
    
      
    }, [props])
    
    return(
        <div>
            {supportData.map((data, index)=>{
                return(
                    <div key={index}>{data.name}</div>
                )
            })}
        </div>
    )
}
export default SearchDropDown;