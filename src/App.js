import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Write from './Write/Write';
import Board from './Board/Board';
import DoLogin from './DoLogin/DoLogin';
import Join from './Join/Join';
import LoginHome from './LoginHome/LoginHome';
import Main from './Main/Main';
import Home from './Home/Home';
import Find from './Join/Find';
import Create from './Board/Create';
import BoardDetail from './Board/BoardDetail';
import Setting from './Setting/Setting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/doLogin" element={<DoLogin />}/>
        <Route path="/join" element={<Join />}/>
        <Route path="/find" element={<Find />}/>

        <Route path="/home" element={<Home />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/setting" element={<Setting />}/>

        <Route path="/board" element={<Board />}/>
        <Route path="/boardDetail" element={<BoardDetail />}/>
        <Route path="/create" element={<Create />}/>
      

        <Route path="/loginHome" element={<LoginHome />}/>
      </Routes>
    </Router>
  );
}

export default App;
