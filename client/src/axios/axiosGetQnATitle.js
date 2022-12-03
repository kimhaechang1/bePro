import axios from 'axios';
const axiosGetQnATitle = () =>{
    var arr = []
    const pushArr = () =>{
        for(let i=1; i<localStorage.length;i++){
            arr.push(JSON.parse(localStorage.getItem("post_"+i)))
        }
    }
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
                pushArr();
                return arr;
            }else{
                return response.data
            }
            })
        .catch(err =>{
            pushArr();
            if(arr.length == 0){
                return exp;
            }
            return arr;
        })
        return request;
    }
    

    
export default axiosGetQnATitle;