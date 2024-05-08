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
import ReadMore from './components/ReadMore';
import Projectsubmit from './components/Projectsubmit';
import WeeklySubmissionAccordion from './components/WeeklySubmissionAccordion';
import QuizPage from './components/QuizPage';
import PrivateRoutes from './components/PrivateRoutes';
function App() {
  return (
    <div className="App">
      
   <Routes>
    <Route path={'/'} element={<Home/>}></Route>
    <Route path={'/login'} element={<Login/>}></Route>
    <Route path={'/signup'} element={<Signup/>}></Route>
    <Route element={<PrivateRoutes/>}>
    <Route path={'/dashboard'} element={<Studentdashboard/>}></Route>
    <Route path={'/mern'} element={<Mern/>}></Route>
        <Route path={'/project'} element={<Projectdashboard />}></Route>
        
        <Route path={'/demo'} element={<Demo />}></Route>
        <Route path={'/chat'} element={<Chat />}></Route>
        <Route path={'/main'} element={<Maincomponent />}></Route>
        <Route path={'/profile'} element={<Profile />}></Route>
        <Route path={'/overview'} element={<ProjectOverview />}></Route>
        <Route path={'/projects'} element={<StudentProjects />}></Route>
        <Route path="/readmore/:projectId" element={<ReadMore />} />
        <Route path="/projectsub" element={<Projectsubmit />} />
        <Route path="/weeksubmission" element={<WeeklySubmissionAccordion />} />
        <Route path="/viva" element={<QuizPage/>} />
        </Route>
   </Routes>
    </div>
  );
}

export default App;
