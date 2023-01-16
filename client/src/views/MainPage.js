import Card from '../components/Card';
import SideBar from '../components/SideBar';
import './css/MainPage.css';

function MainPage(){
    return(
    <div className="App">
      <div className="mainContentFrame">
        <div className="innerArea border">
          <div className="contentFrame">
            <SideBar name={"# 실시간 태그순위"}/>
            <div className="cardFrame">
              <div className="cardArea">
                <Card name={"최신 QnA"} referrer={"main"}/>
              </div>
              <div className="cardArea">
                <Card name={"공지사항"} referrer={"main"}/>
                <Card name={"조회수 높은 순"} referrer={"main"}/>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default MainPage;