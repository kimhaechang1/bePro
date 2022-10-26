import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosLoginData from '../axios/axiosLoginData';
function SignIn(props){
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const onSubmitHandler = (e)=>{
        let loginData = {
            id : id,
            password : pw
        }
        e.preventDefault();
        const result = axiosLoginData(loginData);
        if(result.resultData.loginSuccess){
            alert(result.resultData.msg);
            localStorage.setItem("token", JSON.stringify({value:result.resultData.cookie, nick:result.resultData.nick}));
            navigate(0);
        }else{
            alert(result.resultData.msg);
        }
    }
    return(
        <div className="modal">
            <div className="loginModal">
                <span className="close" onClick={()=>{props.forClose(false)}}>X</span>
                <form onSubmit={onSubmitHandler}>
                    <div className="modalContents">
                        <input type="text" className="loginId" placeholder="아이디" value={id} onChange={(e)=>{setId(e.target.value)}}></input>
                        <input type="password" className="loginPw" placeholder="비밀번호" value={pw} onChange={(e)=>{setPw(e.target.value)}}></input>
                    </div>
                    <br/>
                    <button>Submit</button>                    
                </form>
            </div>
        </div>
    )
}
export default SignIn