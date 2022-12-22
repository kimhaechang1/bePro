import { Outlet } from "react-router-dom"
import Header from "../../components/Header"

const NoticeBoard = () =>{
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default NoticeBoard;