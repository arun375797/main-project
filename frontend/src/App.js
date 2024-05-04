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
import Chat from './components/Chat';
import StudentProjects from './components/StudentProjects';
import Maincomponent from './components/Maincomponent';
import Profile from './components/Profile';
import ProjectOverview from './components/ProjectOverview';
function App() {
  return (
    <div className="App">
      
   <Routes>
    <Route path={'/'} element={<Home/>}></Route>
    <Route path={'/login'} element={<Login/>}></Route>
    <Route path={'/signup'} element={<Signup/>}></Route>
    <Route path={'/dashboard'} element={<Studentdashboard/>}></Route>
    <Route path={'/mern'} element={<Mern/>}></Route>
        <Route path={'/project'} element={<Projectdashboard />}></Route>
        <Route path={'/projects'} element={<StudentProjects />}></Route>
        <Route path={'/demo'} element={<Demo />}></Route>
        <Route path={'/chat'} element={<Chat />}></Route>
        <Route path={'/main'} element={<Maincomponent />}></Route>
        <Route path={'/profile'} element={<Profile />}></Route>
        <Route path={'/overview'} element={<ProjectOverview />}></Route>
   </Routes>
    </div>
  );
}

export default App;
