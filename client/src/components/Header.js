import {Link} from 'react-router-dom';
function Header(){
    return(
        <div className="area">
            <div className="innerArea">
                <div className="contentArea">
                <Link to="/"><div className="headerTitle">TITLE</div></Link>
                    <div className="headerTools">
                        <ul className="headerToolTitle">
                            <Link to="/QnA/*"><li>QnA</li></Link>
                            <Link to="/Dic/*"><li>용어사전</li></Link>
                            <Link to="/"><li>Sign in</li></Link>
                            <Link to="/"><li>Sign up</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;