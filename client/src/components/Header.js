import {useState} from 'react';
import {Link} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
function Header(){
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    return(
        <div className="area">
            <div className="innerArea">
                <div className="contentArea">
                <Link to="/"><div className="headerTitle">TITLE</div></Link>
                    <div className="headerTools">
                        <ul className="headerToolTitle">
                            <Link to="/MyPage/*"><li>마이페이지</li></Link>
                            <li onClick={()=>{ setSignIn(true)}}>Sign in</li>
                            {signIn ? <SignIn forClose={setSignIn}/> : null }
                            <li onClick={()=>{setSignUp(true)}}>Sign up</li>
                            {signUp ? <SignUp forClose={setSignUp}/> : null}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;