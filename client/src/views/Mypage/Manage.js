import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useOutletContext, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axiosGetPostings from "../../axios/axiosGetPostings";
import Page from "../../components/Page";

const Manage = (props) =>{
    const [resOfQna, setResOfQna] = useState([]);
    const [resOfNoti, setResOfNoti] = useState([]);
    const [maxPage] = useState(5);
    const [limit] = useState(6);  
    const [currentPage, setCurrentPage] = useState({});
    const [searchParams] = useSearchParams();

    const { setCurrentSelected , isCurrentUserAdmin, userAuth} = useOutletContext();
    const location = useLocation();
    useEffect(()=>{
        const qna_page  = parseInt(searchParams.get("qna_page"));
        const notice_page = parseInt(searchParams.get("notice_page"));
        const pageObj = {
            qna_page : qna_page,
        }
        if(notice_page){
            pageObj.notice_page = notice_page;
        }
        setCurrentPage(pageObj);
        setCurrentSelected((location.pathname.split("/"))[2]);
        if(!localStorage.getItem("token")){
            return;
        }
        let body = {
            id : JSON.parse(localStorage.getItem("token")).id
        }
        
        const res =  axiosGetPostings(body);
        res.then(data=>{
            let qna = [];
            let notice = [];
            if(data.length>0){
                data.map((value)=>{
                    if(value.category ==="qna"){
                        return qna.push(value);
                    }else{
                        return notice.push(value);
                    }
                })
            }
            setResOfQna(qna);
            setResOfNoti(notice);
           
        })
        
    },[isCurrentUserAdmin, userAuth,searchParams])

    return (
        <div className="cardFrame">
            <div className="cardArea">
                <Card name={"내가 쓴 QnA"} referrer={"mypage"} data={resOfQna.slice(0+((currentPage['qna_page']-1)*(limit)), (limit*currentPage['qna_page']))} isCurrentUserAdmin={isCurrentUserAdmin}/>
            </div>
            <div className="PageArea">
                <Page query={"qna_page"} maxPage={maxPage} limit={limit} total={resOfQna.length}/>
            </div>
            { isCurrentUserAdmin ? 
            <>
            <div className="cardArea">
                <Card name={"내가 쓴 공지사항"} referrer={"mypage"} data={resOfNoti.slice(0+((currentPage['notice_page']-1)*(limit)), (limit*currentPage['notice_page']))} isCurrentUserAdmin={isCurrentUserAdmin}/>
            </div>
            <div className="PageArea">
                <Page query={"notice_page"} maxPage={maxPage} limit={limit} total={resOfNoti.length}/>
            </div>
            </>  : null}
        </div>
    )
}

export default Manage;