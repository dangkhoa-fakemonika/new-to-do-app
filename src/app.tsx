import './index.css'
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskHome from "@/pages/main-menu/main-menu.tsx";
import RandomStuff from "@/pages/random-stuff/random-stuff.tsx";
import ArchivedTasks from "@/pages/archived/archived.tsx";
import Layout from "@/layout/layout.tsx"

function App() {

  return (
    // <TaskManagerContext.Provider value={taskList}>
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index={true} element={<TaskHome/>} />
            <Route path={"/archived"} element={<ArchivedTasks/>} />
            <Route path={"/random"} element={<RandomStuff/>}/>
          </Route>
        </Routes>
      </Router>
    // </TaskManagerContext.Provider>
  )
}

export default App
