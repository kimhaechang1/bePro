import {useState, useEffect} from 'react';
import axiosSignUpData from '../axios/axiosSignUpData';
import axiosSignInData from '../axios/axiosSignInData';
import axiosIdDuplicateCheck from '../axios/axiosIdDuplicateCheck';
import '../components/css/SignUp.css';

function SignUp(props){
    
    
    const [majorInput, setMajorInput] = useState(false);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [nick, setNick] = useState("");
    const [major, setMajor] = useState("");
    const [isDupliCheck, setIsDupliCheck] = useState(false); // true : 중복아님 | false : 중복체크를 안했거나 했는데 중복임

    useEffect(()=>{
        if(props.referrer ==="edit_profile"){
            if(!JSON.parse(localStorage.getItem("token")) || !JSON.parse(localStorage.getItem("token")).id){
                return;
            }
            const userData = JSON.parse(localStorage.getItem("token"));
            if(userData.isPro){
                setMajorInput(true);
                setMajor(userData.major);
            }
            setId(userData.id);
            setNick(userData.nick);
            setEmail(userData.email);
        }
    },[props.referrer])

    const onClickHandler = (e) => {
        let idValue = {
            id : id
        }
        e.preventDefault();
        const result  = axiosIdDuplicateCheck(idValue);
        console.log(result);
        result.then( data =>{
            if(data.idCheckSuccess){
                alert(data.msg);
                e.target.disabled=true;
                setIsDupliCheck(true);
            }else{
                alert(data.msg);
            }
        })
    }

    
    /*
    axiosSignUpData.js 에서 회원가입 데이터를 받고
    서버로 전송 후 msg 와 회원가입 성공여부를 받는다.
    회원가입에 성공하였을 시 즉시 로그인에 시도한다.
    */
    const onSubmitHandler = (e) =>{
        if(!isDupliCheck){
            alert("아이디 중복확인 해 주세요");
            e.preventDefault();
            return;
        }else{
            let SignUpData ={
                id : id,
                email : email,
                pw : pw,
                nick : nick,
                isPro : majorInput,
                major : major
            }
            e.preventDefault();
            const result = axiosSignUpData(SignUpData);
            console.log(result);
            result.then(data => {
                if(data.signUpSuccess){
                    alert(data.msg);
                    var loginData ={
                        id : id,
                        pw : pw,
                    }
                    axiosSignInData(loginData);
                }else{
                    alert(data.msg)
                }
            })
        }
    }

    const onUpdateHandler = (e) =>{
        if(!isDupliCheck){
            alert("아이디 중복확인 해 주세요");
            e.preventDefault();
            return;
        }else{
            let updateData ={
                id : id,
                email : email,
                pw : pw,
                nick : nick,
                isPro : majorInput,
                major : major
            }
            e.preventDefault();
            props.forSetModal(true);
            props.setUpdateUserData(updateData);
        }
    }


    return(
        <div className={props.referrer ==="edit_profile" ? "signUpdateArea" : "modal"}>
            {props.referrer === "edit_profile" ? <div className="signUpdateTitle">회원정보 수정</div> : null}
            <div className={props.referrer ==="edit_profile" ? "signUpdateFrame" : "SignUpModal"}>
                {props.referrer === "edit_profile" ? null : <span className="close" onClick={()=>{props.forClose(false)}}>x</span>}
                <div className={props.referrer ==="edit_profile" ? "signUpdateContents" : "modalContents"}>
                    <form onSubmit={ props.referrer==="edit_profile" ? onUpdateHandler : onSubmitHandler}>
                        <input type="text" className="SignUpId" value={id} onChange={(e)=>{setId(e.target.value)}} placeholder="아이디 입력" required></input>
                        <input type="button" className="JungbokBtn" value="중복체크" onClick={onClickHandler}></input>
                        <input type="email" className="SignUpEmail" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="이메일 입력" required></input>
                        <input type="password" className="SignUpPw" value={pw} onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호 입력" required></input>
                        <input type="text" className="SignUpNick" value={nick} onChange={(e)=>{setNick(e.target.value)}} placeholder="닉네임 입력" required></input>
                        <p>전공자 인가요?</p>
                        <span>
                            예<input className="radio" type="radio" name="jeon"onClick={()=>{setMajorInput(true)}} checked={majorInput}></input>
                        
                            아니오<input type="radio" name="jeon" onClick={()=>{setMajorInput(false)}} checked={!majorInput}></input>
                        </span>
                        {majorInput ? <input type="text" className="SignUpJeon" value={major} onChange={(e)=>{setMajor(e.target.value)}} placeholder="전공입력 ex) 컴퓨터공학과" required></input> : null}
                        {props.referrer==="edit_profile" ? <button className="SignUpBtn">업데이트</button> : <button className="SignUpBtn">가입하기</button>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;