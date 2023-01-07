import axios from "axios";

const axiosSignUpdate = (body) =>{
    const request = axios.post('/user/userupdate',body)
    .then(response=> response.data)
    .catch(err=>{
        return {
            msg : `통신 오류(${err.request.status}) 발생하였습니다.`
        }
    })
    return request;
}

export default axiosSignUpdate;