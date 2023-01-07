import axios from 'axios';
function axiosSignInData(data, auth){
    const request = axios.post('/user/signin',data)
    .then(response =>response.data
    ).catch(err =>{
        alert(err.message);
    })
    request.then(token => {
        if(token.loginSuccess){
            localStorage.setItem("token",JSON.stringify({
                value:token.cookie, 
                nick:token.nick, 
                id:data.id,
                isPro : token.isPro,
                major : token.major,
                email : token.email
            }))
            if(!auth){
                window.location.reload();
            }
        }
    })
    
    return request;
}
export default axiosSignInData;