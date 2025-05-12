import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskHome from "./pages/main-menu.tsx";
import HeaderBar from "./header-bar.tsx";
import './index.css'
import RandomStuff from "@/pages/random-stuff.tsx";
import ArchivedTasks from "@/pages/archived.tsx";

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
