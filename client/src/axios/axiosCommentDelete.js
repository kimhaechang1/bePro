import axios from 'axios';

const axiosCommentDelete = (post) =>{
    const res = axios.post('/comment/delete',post)
    .then( response => response.data)
    .catch(err =>{
        return {
            msg : `통신 오류(${err.request.status}) 발생하였습니다.`
        }
    })

    return res;    
}

export default axiosCommentDelete;