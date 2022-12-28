import axios from "axios"
/** 
 *  @param {object} option
 *  @param {string} id 현재 Signin 되어있는 아이디
 *  @param {string} index 해당 글 고유 인덱스 번호
 *  @param {string} cate 어떤 용도로 쓰일건지 post or comment
 *  @param {string} token 현재 Signin 되어있는 토큰값
 *  @param {boolean} isAdmin 어드민 인증 필요여부
 *  @param {boolean} isEdit 수정가능 여부
 *  @param {boolean} isSignin 실제 로그인 되어있는지 검사 여부
 */
const axiosAuth = (option) =>{
    const res = axios.post('/auth',option)
    .then(response => response.data)
    .catch( err =>{
        return {
            msg : `통신 오류(${err.request.status}) 발생하였습니다.`
        }
    })
    return res;
}
export default axiosAuth;