import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SideMenu.css';
const SideMenu = (props) =>{
    const [menuList, setMenuList] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        setMenuList(props.menuList);
    },[props.current])

    return(
        <div className="sideMenuFrame">
            {
            menuList.map((data,index)=>{
                return(
                    <div className="sideMenuElement" key={data.menu_value}>
                        <div onClick={()=>{
                            navigate(`/mypage/${data.menu_value}${data.menu_value==="manage" ? "?qna_page=1":''}${props.isCurrentUserAdmin && data.menu_value==="manage" ? "&notice_page=1" : '' }`);
                        }} className={props.current === data.menu_value ? "sideMenuElementInside currentSelected" : "sideMenuElementInside"}>{data.render}</div>
                    </div>
                )    
            })
            }
        </div>
    )
}

export default SideMenu