import axios from "axios";

const axiosGetPostings = (id) =>{
    const request =  axios.post("/user/getpostings",id)
    .then(response => response.data )
    .catch(err =>{
        return {
            msg : `통신 오류(${err.request.status}) 발생하였습니다.`
        }
    })
    return request;
}
export default axiosGetPostings;