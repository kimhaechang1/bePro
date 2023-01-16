import { useState } from "react";
import { useNavigate} from "react-router-dom";
import '../components/css/SearchBox.css';
import SearchDropDown from "./SearchDropDown";
import HashTag from "./HashTag";

const SearchBox = (props) =>{
    const [value, setValue] = useState("");
    const [hashTag, setHashTag] = useState([]);

    const navigate = useNavigate();
    const onClickHandler = () =>{
        navigate(`/search?q=${value}&tags=${hashTag.join(',')}&qna_page=1&notice_page=1`);
    }

    return(
        <div className="searchBoxFrame">
          <div className="searchBox">
            <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}}/>
            <button className="searchBoxSubmit" onClick={onClickHandler}>검색</button>      
          </div>
          <SearchDropDown inputValue={value} forDelText={setValue} setHashTag={setHashTag} forAppendHashTag={hashTag} />
          <div className="tagArea" id="tags">
            { hashTag.length > 0 ? hashTag.map(name =>(<HashTag forDelTag={hashTag} setHashTag={setHashTag} tagName={name} key={name}>{name}</HashTag>) ) : null }
          </div>
        </div>
    )
}

export default SearchBox;