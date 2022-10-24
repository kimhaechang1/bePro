import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}from "react-router-dom";

import MainPage from './views/MainPage';
import GongJi from './views/GongJi';
import Dic from './views/Dic';
import QnABoard from './views/QnABoard';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/Gongji/*" element={<GongJi/>}/>
          <Route path="/Dic/*" element={<Dic/>}/>
          <Route path="/QnA/*" element={<QnABoard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
