import axios from 'axios';
const axiosGetQnATitle = () =>{
    const exp = [
        { 
            title : "메인페이지 qna1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 qna1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 qna1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 qna1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 qna1",
            views : 123,
            date : "2022-11-14"
        }
    ]
    const request = axios.get('/get/mainqna')
    .then( response => {
        if(!response.data){
            return exp;
        }else{
            return response.data
        }
    }).catch(err =>{
        return exp;
    })

    return request;
}
export default axiosGetQnATitle;