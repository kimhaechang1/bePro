import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../components/css/SignUp.css';
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";


const EditProfile = () =>{
    const [signInModal, setSignInModal] = useState(false);
    const [updateUserData, setUpdateUserData] = useState()

    const { setCurrentSelected } = useOutletContext();
    const location = useLocation();
    const param = (location.pathname.split("/"))[2];
    useEffect(()=>{
        setCurrentSelected(param);
    },[])

    return(
        <>
            {signInModal ? <SignIn referrer={param} forClose={setSignInModal} userData={updateUserData}/> : null}
            <SignUp referrer={param} forSetModal={setSignInModal} setUpdateUserData={setUpdateUserData}/>
        </>
    )
}

export default EditProfile;