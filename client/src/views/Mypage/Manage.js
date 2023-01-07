import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import axiosGetPostings from "../../axios/axiosGetPostings";

const Manage = (props) =>{
    const [resOfQna, setResOfQna] = useState([]);
    const [resOfNoti, setResOfNoti] = useState([]);

    const { setCurrentSelected , isCurrentUserAdmin, userAuth} = useOutletContext();
    const location = useLocation();
    useEffect(()=>{
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
    },[isCurrentUserAdmin, userAuth])

    return (
        <div className="cardFrame">
            <div className="cardArea">
                <Card name={"내가 쓴 QnA"} referrer={"mypage"} data={resOfQna} isCurrentUserAdmin={isCurrentUserAdmin}/>
            </div>
            { isCurrentUserAdmin ? 
            <div className="cardArea">
                <Card name={"내가 쓴 공지사항"} referrer={"mypage"} data={resOfNoti} isCurrentUserAdmin={isCurrentUserAdmin}/>
            </div>  : null}
        </div>
    )
}

export default Manage;