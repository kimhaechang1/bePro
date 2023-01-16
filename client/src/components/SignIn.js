import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosSignInData from '../axios/axiosSignInData';
import axiosSignUpdate from '../axios/axiosSignUpdate';
import '../components/css/SignIn.css';

function SignIn(props){

    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    useEffect(()=>{
        if(props.referrer==="edit_profile"){
            setId(JSON.parse(localStorage.getItem("token")).id);
        }
    })

    const onSubmitHandler = (e)=>{
        let loginData = {
            id : id,
            pw : pw
        }
        e.preventDefault();
        const result = axiosSignInData(loginData,false);
        result.then(data => {
            alert(data.msg);
        }) 
    }
    const onAuthSubmitHandler = (e) =>{
        let loginData = {
            id : id,
            pw : pw
        }
        e.preventDefault();
        const result = axiosSignInData(loginData,true);
        result.then(data => {
            if(data.loginSuccess){
                alert("인증되었습니다.");
                props.forClose(false);
                let updateData = {
                    oldId : JSON.parse(localStorage.getItem("token")).id,
                    ...props.userData
                }
                const res = axiosSignUpdate(updateData);
                res.then(data=>{
                    alert(data.msg);
                    localStorage.removeItem("token");
                    alert("다시 로그인 해 주세요.");
                    navigate('/');
                    window.location.reload();
                    props.forClose(true);
                })
            }else{
                alert("비밀번호를 확인 해 주세요");
            }
        }) 
    }

    return(
        <div className="modal">
            <div className="loginModal">
                <span className="close" onClick={()=>{props.forClose(false)}}>x</span>
                <form onSubmit={props.referrer === "edit_profile"? onAuthSubmitHandler : onSubmitHandler}>
                    <div className="modalContents">
                        <input type="text" className="loginId" placeholder="아이디" value={id} onChange={(e)=>{setId(e.target.value)}} required></input>
                        <input type="password" className="loginPw" placeholder="비밀번호" value={pw} onChange={(e)=>{setPw(e.target.value)}} required></input>
                    </div>
                    <br/>
                    <div className="loginArea">
                        <button className="loginBtn">로그인</button>       
                    </div>             
                </form>
            </div>
        </div>
    )
}
export default SignIn;