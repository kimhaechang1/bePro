import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosAuth from "../../axios/axiosAuth";
import SideMenu from "../../components/SideMenu";


function MyPage(){
    const [menuList] = useState([{menu_value : "manage",render: "쓴글 관리"},{menu_value : "edit_profile", render : "회원정보 관리"}]);
    const [currentSelected, setCurrentSelected] = useState("");
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
    const [userAuth, setUserAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("token"))){
            alert("권한이 없습니다.");
            return navigate("/");
        }
        const lsValue = JSON.parse(localStorage.getItem("token"));
        const res = axiosAuth({
            id : lsValue.id,
            token  : lsValue.value,
            isAdmin : true,
            isSignin : true
        })
        res.then(data=>{
            if(!data.signinAuth){
                alert("권한이 없습니다.");
                return navigate("/");
            }
            setUserAuth(data.signinAuth);
            setIsCurrentUserAdmin(data.adminAuth);
        })
    },[])

    return(
      <div className="App">
        <div className="mainContentFrame">
          <div className="innerArea border">
            <div className="contentFrame">
                <SideMenu isCurrentUserAdmin={isCurrentUserAdmin} menuList={menuList} current={currentSelected}/>
                <Outlet context={{setCurrentSelected, isCurrentUserAdmin, userAuth}}/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default MyPage;