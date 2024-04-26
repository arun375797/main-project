import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Studentdashboard from './components/Studentdashboard';
import Mern from './components/Mern';
import Projectdashboard from './components/Projectdashboard';
import Demo from './components/Demo';
function App() {
  return (
    <div className="App">
      
   <Routes>
    <Route path={'/'} element={<Home/>}></Route>
    <Route path={'/login'} element={<Login/>}></Route>
    <Route path={'/signup'} element={<Signup/>}></Route>
    <Route path={'/stdash'} element={<Studentdashboard/>}></Route>
    <Route path={'/mern'} element={<Mern/>}></Route>
        <Route path={'/project'} element={<Projectdashboard />}></Route>
        <Route path={'/demo'} element={<Demo />}></Route>
   </Routes>
    </div>
  );
}

export default App;
