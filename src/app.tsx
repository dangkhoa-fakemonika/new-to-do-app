import './index.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import TaskHome from "@/pages/main-menu/main-menu.tsx";
import RandomStuff from "@/pages/random-stuff/random-stuff.tsx";
import ArchivedTasks from "@/pages/archived/archived.tsx";
import Layout from "@/layout/layout.tsx"
import LoginPage from "@/pages/authentication/login/login-page.tsx";
import MyProfile from "@/pages/authentication/profile/my-profile.tsx";
import UnauthLayout from "@/layout/unauth-layout.tsx";
import WelcomePage from "@/pages/welcome/welcome.tsx";
function App() {


  return (
    // <TaskManagerContext.Provider value={taskList}>
      <Router>
        <Routes>
          <Route path={"/"} index={true} element={<WelcomePage/>}/>
          <Route path={"*"} element={<Navigate to={"/dashboard"} replace/>}/>
          <Route element={<Layout/>}>
            <Route index={true} path={"/dashboard"} element={<TaskHome/>} />
            <Route path={"/archived"} element={<ArchivedTasks/>} />
            <Route path={"/random"} element={<RandomStuff/>}/>
            <Route path={"/me"} element={<MyProfile/>}/>
          </Route>
          <Route element={<UnauthLayout/>}>
            <Route index={true} path={"/login"} element={<LoginPage/>}/>
          </Route>

        </Routes>
      </Router>
    // </TaskManagerContext.Provider>
  )
}

export default App
