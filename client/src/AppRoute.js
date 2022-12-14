import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom";

import Root from "./views/Root";
import MainPage from './views/MainPage';
import MyPage from './views/Mypage/MyPage';
import Write from './views/Write';
import QnABoard from "./views/QnA/QnABoard";
import QnABoardList from "./views/QnA/QnABoardList";
import QnAView from "./views/QnA/QnAView";
import NoticeBoard from "./views/Notice/NoticeBoard";
import NoticeBoardList from "./views/Notice/NoticeBoardList";
import NoticeView from "./views/Notice/NoticeView";
import Cod404 from "./views/Cod404";
import Search from "./views/Search";
import EditProfile from "./views/Mypage/EditProfile";
import Manage from "./views/Mypage/Manage";

function AppRoute() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Root/>}>
            <Route index element={<MainPage/>}/>
            <Route path="/mypage/" element={<MyPage/>}>
              <Route index element={<Cod404/>}/>
              <Route path="edit_profile" element={<EditProfile/>}/>
              <Route path="manage" element={<Manage/>}/>
              <Route path="*" element={<Cod404/>}/>
            </Route>
            <Route path="/qna" element={<QnABoard/>}>
              <Route index element={<QnABoardList/>}/>
              <Route path=":id" element={<QnAView/>}/>
              <Route path="*" element={<Cod404/>}/>
            </Route>
            <Route path="/write" element={<Write/>}/>
            <Route path="/notice" element={<NoticeBoard/>}>
              <Route index element={<NoticeBoardList/>}/>
              <Route path=":id" element={<NoticeView/>}/>
              <Route path="*" element={<Cod404/>}/>
            </Route>
            <Route path="/search" element={<Search/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoute;

