import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom";

import MainPage from './views/MainPage';
import MyPage from './views/MyPage';
import Write from './views/Write';
import QnABoard from "./views/QnA/QnABoard";
import QnABoardList from "./views/QnA/QnABoardList";
import QnAView from "./views/QnA/QnAView";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/mypage/*" element={<MyPage/>}/>
          <Route path="/qna" element={<QnABoard/>}>
            <Route index element={<QnABoardList/>}/>
            <Route path=":id" element={<QnAView/>}/>
          </Route>
          <Route path="/write" element={<Write/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
