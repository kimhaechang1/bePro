import {useState} from 'react';

function SignUp(props){
    const [전공입력, set전공입력] = useState(false)
    return(
        <div className="modal">
            <div className="SignUpModal">
                <span className="close" onClick={()=>{props.forClose(false)}}>X</span>
                <div className="modalContents">
                    <input type="text" className="SignUpId" placeholder="아이디 입력"></input>
                    <input type="email" className="SignUpEmail" placeholder="이메일 입력"></input>
                    <input type="password" className="SignUpPw" placeholder="비밀번호 입력"></input>
                    <input type="text" className="SignUpNick" placeholder="닉네임 입력"></input>
                    <p>전공자 인가요?</p>
                    예<input type="radio" name="jeon"onClick={()=>{set전공입력(true)}}></input>
                    아니오<input type="radio" name="jeon" onClick={()=>{set전공입력(false)}}></input>
                    {전공입력 ? <input type="text" className="SignUpJeon" placeholder="전공입력 ex) 컴퓨터공학과"></input> : null}
                </div>
            </div>
        </div>
    )
}

export default SignUp;