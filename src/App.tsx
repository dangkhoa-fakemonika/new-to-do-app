import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskHome from "./pages/MainMenu/main-menu.tsx";
import HeaderBar from "./layout/header-bar.tsx";
import './index.css'
import RandomStuff from "@/pages/RandomStuff/random-stuff.tsx";
import ArchivedTasks from "@/pages/Archived/archived.tsx";

function App() {

  return (
    // <TaskManagerContext.Provider value={taskList}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HeaderBar/>}>
            <Route index={true} element={<TaskHome/>} />
            <Route path={"/archived"} element={<ArchivedTasks/>} />
            <Route path={"/random"} element={<RandomStuff/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    // </TaskManagerContext.Provider>
  )
}

export default App
