import axios from 'axios';
function axiosSignOut(){
    const clientData = JSON.parse(localStorage.getItem("token"));
    if(clientData){
        const logoutData = {
            id : clientData.id
        }

        const request = axios.post('/user/signout', logoutData)
        .then( response=> response.data)
        request.then(data => {
            if(data.signOutSuccess){
                alert(data.msg);
                localStorage.removeItem("token");
                window.location.reload();
            }else{
                alert(data.msg); 
            }
        }).catch(err => alert(err.message));
        
    }else{
        alert("이미 로그아웃 상태 입니다.");
        window.location.reload();
    }
    
}
export default axiosSignOut;