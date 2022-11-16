import axios from 'axios';
function axiosSignOut(){
    /*
    let response = {
        signOutSuccess : true or false,
        msg : 로그아웃에 성공했습니다, 실패했습니다.
        get 요청을 통해 서버상에 로그인 token 삭제
    }
    */
    // 임시 로그아웃
    const clientData =  localStorage.getItem("token");
    if(clientData){
        localStorage.removeItem("token");
        return true;
    }else{
        alert("이미 로그아웃 상태 입니다.");
    }
    // 백엔드 통신 로그아웃
    /*const clientData =  localStorage.getItem("token")
    if(clientData){
        const request = axios.get('/user/signout')
        .then( response=> response.data)
        request.then(data => {
            if(data.signOutSuccess){
                alert(data.msg);
                localStorage.removeItem("token");
                return true;
            }else{
                alert(data.msg);
            }
        }).catch(err => alert(err.message));
    }else{
        alert("이미 로그아웃 상태 입니다.");
    }*/
    return false;
}
export default axiosSignOut;