import axios from 'axios';
const axiosGetGongjiTitle = () =>{
    const exp = [
        { 
            title : "메인페이지 공지1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 공지1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 공지1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 공지1",
            views : 123,
            date : "2022-11-14"
        },
        { 
            title : "메인페이지 공지1",
            views : 123,
            date : "2022-11-14"
        }
    ]
    const request = axios.get('/get/maingongji')
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

export default axiosGetGongjiTitle;