import axios from "axios";
/** 
 *  @param {object} post
 *  @param {string} id 글 고유 인덱스 번호
 *  @param {string} commentDetail 댓글 내용
 *  @param {boolean} isAnony 익명 여부, true면 아래 값들 공백으로 넣을 것
 *  @param {string} commentNick 댓글 쓴 유저 닉네임
 *  @param {string} commentId 댓글 쓴 사람 아이디
 */
const axiosComment = (post) =>{
    console.log(post);
    const res = axios.post('/comment/new',post)
    .then( response => response.data)
    .catch(err =>{
        return {
            msg : `통신 오류(${err.request.status}) 발생하였습니다.`
        }
    })

    return res;
}

export default axiosComment;