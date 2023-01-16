import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import axiosSignOut from '../axios/axiosSignOut';
import axiosAuth from '../axios/axiosAuth';
import SearchBox from './SearchBox';
import '../components/css/Header.css';


function Header(){
    const navigate= useNavigate();
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [nick, setNick] = useState("");
    const [token, setToken] = useState("");
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
    const [searchBoxToggle, setSearchBoxToggle] = useState(false);


    const signOutHandler = ()=>{
        axiosSignOut();
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            const userData = JSON.parse(localStorage.getItem("token"));
            setNick(userData.nick);
            setToken(userData.value);
            const res = axiosAuth({
                id : userData.id,
                token : userData.value,
                isSignin : true,
                isAdmin : true
            })
            res.then(data =>{
                if(data.adminAuth && data.signinAuth){
                    setIsCurrentUserAdmin(true);
                }
            })
        }
    }, [token])

    const UI = {
        loginSuccess1 : <Link to={isCurrentUserAdmin ? `/mypage/manage?qna_page=1&notice_page=1` : '/mypage/manage?qna_page=1'}><li>{nick}</li></Link> ,
        loginSuccess2 : <li onClick={()=>{signOutHandler()}}>Sign Out</li>,
        SignUp : <li onClick={()=>{setSignUp(true)}}>Sign up</li>,
        SignIn : <li onClick={()=>{setSignIn(true)}}>Sign in</li>
    }

    return(
        <>
        <div className="area">
            <div className="innerArea">
                <div className="contentArea">
                <Link to="/"><div className="headerTitle">be전공자</div></Link>
                    <div className="headerTools">
                        <ul className="headerToolTitle">
                            <div>
                                <img onClick={()=>{ {searchBoxToggle ? setSearchBoxToggle(false) : setSearchBoxToggle(true)}}} src={`${process.env.PUBLIC_URL}/search.svg`}/>
                                {searchBoxToggle ? <SearchBox/> : null}
                            </div>
                            {isCurrentUserAdmin ? <div style={{cursor:"pointer"}} onClick={()=>{ navigate('/write?board=notice&type=new',{state:{ isCurrentUserAdmin : isCurrentUserAdmin }}) }}>공지사항 글쓰기</div> : null }
                            {isCurrentUserAdmin ? <span>|</span> : null}
                            {token ? <div style={{cursor:"pointer"}} onClick={()=>{ navigate('/write?board=qna&type=new',{state:{ isCurrentUserAdmin : isCurrentUserAdmin }}) }}>글쓰기</div> : null }
                            {token ? <span>|</span> : null}
                            <Link to="/qna?page=1"><div>글목록</div></Link>
                            <span>|</span>
                            {token ? UI['loginSuccess1'] : UI['SignIn']}
                            {signIn ? <SignIn forClose={setSignIn} forNick={setNick}/> : null}
                            <span>|</span>
                            {token ? UI['loginSuccess2'] : UI['SignUp']}
                            {signUp ? <SignUp forClose={setSignUp}/> : null }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Header;