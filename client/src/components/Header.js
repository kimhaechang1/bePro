import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import axiosSignOut from '../axios/axiosSignOut';
import SearchDropDown from './SearchDropDown';
import axiosSearch from '../axios/axiosSearch';
function Header(){
    const navigate= useNavigate();
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const [nick, setNick] = useState("");
    const [token, setToken] = useState("");
    const [searchData, setSearchData] = useState("");
    
    const onClickHandler = () =>{
        axiosSearch(searchData);
    }

    const signOutHandler = ()=>{
        const isLogOut = axiosSignOut();
        if(isLogOut){
            navigate(0);
        }
    }
    
    const onSearchBoxHandler = () =>{
        searchBox ? setSearchBox(false) : setSearchBox(true);
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            const userData = JSON.parse(localStorage.getItem("token"));
            setNick(userData.nick);
            setToken(userData.value);
        }
    }, [token])

    const UI = {
        loginSuccess1 : <Link to="/MyPage/*"><li>마이페이지</li></Link> ,
        loginSuccess2 : <li onClick={()=>{signOutHandler()}}>Sign Out</li>,
        SignUp : <li onClick={()=>{setSignUp(true)}}>Sign up</li>,
        SignIn : <li onClick={()=>{setSignIn(true)}}>Sign in</li>
    }

    return(
        <div className="area">
            <div className="innerArea">
                <div className="contentArea">
                <Link to="/"><div className="headerTitle">be전공자</div></Link>
                    <div className="headerTools">
                        <ul className="headerToolTitle">
                        {searchBox ? <input type="text" value={searchData} onChange={(e)=>{setSearchData(e.target.value)}}></input>: null}
                        {searchBox ? <input type="button" value="검색" onClick={onClickHandler}></input> : null}
                        {searchBox ? <SearchDropDown major={searchData}/> : null}
                        <div className="searchIcon" onClick={onSearchBoxHandler}>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 1244.000000 1280.000000"preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"fill="#000000" stroke="none">
                                <path d="M4025 12789 c-1029 -79 -1969 -501 -2704 -1214 -985 -955 -1456
                                    -2292 -1285 -3650 156 -1244 849 -2360 1899 -3059 193 -129 272 -175 470 -274
                                    452 -227 906 -362 1445 -429 207 -25 763 -25 970 0 404 50 752 138 1115 281
                                    251 98 600 283 819 433 l80 54 1075 -1073 c3835 -3827 3770 -3762 3828 -3795
                                    189 -105 411 -75 563 77 148 148 180 359 84 553 -21 43 -462 488 -2432 2459
                                    -2212 2213 -2404 2408 -2392 2425 8 10 40 47 70 83 714 836 1088 1927 1031
                                    3011 -32 610 -165 1136 -420 1664 -169 349 -340 615 -592 920 -106 128 -395
                                    417 -524 524 -687 569 -1463 900 -2336 996 -174 19 -598 27 -764 14z m780
                                    -949 c777 -118 1453 -463 1982 -1014 516 -536 829 -1194 930 -1951 24 -186 24
                                    -618 0 -810 -54 -416 -158 -758 -342 -1125 -297 -593 -779 -1101 -1360 -1432
                                    -964 -549 -2153 -590 -3152 -108 -975 470 -1667 1364 -1873 2420 -37 192 -51
                                    323 -57 555 -6 258 4 423 42 651 161 971 742 1831 1588 2348 453 278 935 434
                                    1512 490 22 2 164 3 315 1 217 -3 304 -8 415 -25z"/>
                            </g>
                        </svg>
                        </div>
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
    )
}

export default Header;