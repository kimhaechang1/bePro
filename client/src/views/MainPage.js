import '../App.css';
import '../components/css/Card.css';
import '../components/css/Header.css';
import Header from '../components/Header';
import Card from '../components/Card';

function MainPage(){
    return(
    <div className="App">
      <Header/>
      <div className="mainContentFrame">
        <div className="innerArea border">
          <div className="cardArea">
            <Card name={"최신 QnA"}/>
            <Card name={"최근 등록된 용어"}/>
          </div>
          <div className="cardArea">
            <Card name={"공지사항"}/>
            <Card name={"조회수 높은 순"}/>
          </div>
        </div>
      </div>
    </div>
    )
}

export default MainPage;