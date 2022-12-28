import axios from "axios";

const axiosCommentUpdate = (post) =>{
    const res = axios.post('/comment/update',post)
    .then( response => response.data)
    .catch(err =>{
        return {
            msg : `통신 오류(${err.request.status}) 발생하였습니다.`
        }
    })

    return res;   
}

export default axiosCommentUpdate;