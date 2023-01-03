import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosSearch from "../axios/axiosSearch";
import Card from "../components/Card";
import SideBar from "../components/SideBar";

const Search = () =>{
    const [searchParams] = useSearchParams();
    const [resOfQna, setResOfQna] = useState([]);
    const [resOfNoti, setResOfNoti] = useState([]);
    useEffect(()=>{
        let qna = [];
        let noti = [];
        let tags = [];
        const q = searchParams.get("q");
        if(searchParams.get("tags")>1){
            tags = [...searchParams.get("tags").split(",")];
        }
        const res = axiosSearch(q, tags);
        res.then(data=>{
            data.map((context)=>{
                if(context.category ==="qna"){
                   return qna.push(context);
                }else{
                   return noti.push(context);
                }
            })
            setResOfQna(qna);
            setResOfNoti(noti);
        })
    },[searchParams])

    return(
    <div className="App">
      <div className="mainContentFrame">
        <div className="innerArea border">
          <div className="contentFrame">
            <SideBar name={"# 실시간 태그순위"}/>
            <div className="cardFrame">
              <div className="subject">총 {resOfQna.length+resOfNoti.length} 건</div>
              <div className="cardArea">
                <Card name={"QnA 검색결과"} data={resOfQna} referrer={"search"}/>
              </div>
              <div className="cardArea">
                <Card name={"공지사항 검색결과"} data={resOfNoti} referrer={"search"}/>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Search;