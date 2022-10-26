import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
function Header(){
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [nick, setNick] = useState("");
    const [token, setToken] = useState("");
    useEffect(() => {
        if(localStorage.getItem("token")){
            const userData = JSON.parse(localStorage.getItem("token"));
            setNick(userData.nick);
            setToken(userData.value);
        }
    }, [token])
    const UI = {
        loginSuccess1 : <Link to="/MyPage/*"><li>마이페이지</li></Link> ,
        loginSuccess2 : <li>Sign Out</li>,
        SignUp : <li onClick={()=>{setSignUp(true)}}>Sign up</li>,
        SignIn : <li onClick={()=>{setSignIn(true)}}>Sign in</li>
    }
    return(
        <div className="area">
            <div className="innerArea">
                <div className="contentArea">
                <Link to="/"><div className="headerTitle">TITLE</div></Link>
                    <div className="headerTools">
                        <ul className="headerToolTitle">
                            {token ? UI['loginSuccess1'] : UI['SignIn']}
                            {signIn ? <SignIn forClose={setSignIn} forNick={setNick}/> : null}
                            {token ? UI['loginSuccess2'] : UI['SignUp']}
                            {signUp ? <SignUp forClose={setSignUp}/> : null }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;