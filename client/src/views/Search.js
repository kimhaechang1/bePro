import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosSearch from "../axios/axiosSearch";
import Card from "../components/Card";
import SideBar from "../components/SideBar";
import Page from "../components/Page";
const Search = () =>{
    const [searchParams] = useSearchParams();
    const [resOfQna, setResOfQna] = useState([]);
    const [resOfNoti, setResOfNoti] = useState([]);
    const [pagesNumber, setPagesNumber] = useState({});
    const [maxPage] = useState(5); // 페이지네이션 최대 개수
    const [limit] = useState(10); // 한 페이지당 보여질 게시글 개수

    const navigate = useNavigate();
    useEffect(()=>{
        const qna_page  = parseInt(searchParams.get("qna_page"));
        const notice_page = parseInt(searchParams.get("notice_page"));

        setPagesNumber({
          qna_page : qna_page,
          notice_page : notice_page
        });

        let qna = [];
        let noti = [];
        let tags = [];
        const q = searchParams.get("q");
        if(searchParams.get("tags").length>1){
            tags = [...searchParams.get("tags").split(",")];
        }
        const res = axiosSearch(q, tags);
        if(!res){
            return;
        }
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
                <Card name={"QnA 검색결과"} total={resOfQna.length} data={resOfQna.slice(0+((pagesNumber['qna_page']-1)*(limit)), (limit*pagesNumber['qna_page']))} referrer={"search"}/>
              </div>
              <div className="PageArea">
                <Page query={"qna_page"} referrer={"search"} maxPage={maxPage} limit={limit} total={resOfQna.length} queryNameList={Object.keys(pagesNumber)}/>
              </div>
              
              <div className="cardArea">
                <Card name={"공지사항 검색결과"} total={resOfNoti.length} data={resOfNoti.slice(0+((pagesNumber['notice_page']-1)*(limit)), (limit*pagesNumber['notice_page']))} referrer={"search"}/>
              </div>  
              <div className="PageArea">
                <Page query={"notice_page"} referrer={"search"} maxPage={maxPage} limit={limit} total={resOfNoti.length} queryNameList={Object.keys(pagesNumber)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Search;