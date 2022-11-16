import axiosGetQnATitle from "../axiosGetQnATitle";
import axiosGetViewTitle from "../axiosGetViewTitle";
import axiosGetGongjiTitle from "../axiosGetGongjiTitle";

// 메인 페이지의 각각 Card.js에 들어갈 요소들을 통신 할 함수와 바인딩


const bindCardContent = (type) =>{
    const method = {
        "최신 QnA" : axiosGetQnATitle,
        "공지사항" : axiosGetGongjiTitle,
        "조회수 높은 순" : axiosGetViewTitle
    }
    return method[type];
}
export default bindCardContent;