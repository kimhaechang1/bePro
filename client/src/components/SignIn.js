
function SignIn(props){
    return(
        <div className="modal">
            <div className="loginModal">
                <span className="close" onClick={()=>{props.forClose(false)}}>X</span>
                <div className="modalContents">
                    <input type="text" className="loginId" placeholder="아이디"></input>
                    <input type="password" className="loginPw" placeholder="비밀번호"></input>
                </div>
            </div>
        </div>
    )
}
export default SignIn