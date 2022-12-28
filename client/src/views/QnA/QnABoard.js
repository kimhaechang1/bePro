import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import "./css/QnAView.css";
const QnABoard = () =>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}

export default QnABoard;