import axiosGetViewTitle from "../axiosGetViewTitle";
import axiosMainBoard from "../axiosMainBoard";
const bindCardContent = (type) =>{
    const method = {
        "조회수 높은 순" : "qna",
        "최신 QnA" : "qna",
        "공지사항" : "notice",
        "QnA 검색결과" : "qna",
        "공지사항 검색결과" :"notice"
    }
    if(type ==="조회수 높은 순"){
        return {
            boardType : method[type],
            method : axiosGetViewTitle   
        }
    }else if(type==="QnA 검색결과" || type==="공지사항 검색결과"){
        return{
            boardType : method[type]
        }
    }
    else{
        return {
            boardType : method[type],
            method : axiosMainBoard
        }
    }
}
export default bindCardContent;