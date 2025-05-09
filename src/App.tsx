import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskHome from "./pages/main-menu.tsx";
import {useEffect, useMemo, useState} from "react";
import {type Task, TaskSchema} from "@/data_classes/Task-class.ts";
import { TaskManagerContext } from './context';
import HeaderBar from "./header-bar.tsx";
import './index.css'

function App() {

  const localStorageName = "to_do_list_data";
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const getData = localStorage.getItem(localStorageName);
    if (getData == null){
      localStorage.setItem(localStorageName, JSON.stringify([]))
      return [];
    }
    else {
      return JSON.parse(getData);
    }
  });

  const addTask = (new_task : Task)=> {
    const result = TaskSchema.parse(new_task);
    const newState = [...taskList];
    newState.push(result);
    setTaskList(newState);
  }

  // useMemo(() => {
  //     const getData = localStorage.getItem(localStorageName);
  //     if (getData == null){
  //       localStorage.setItem(localStorageName, JSON.stringify([]))
  //       setTaskList([])
  //     }
  //     else {
  //       setTaskList(JSON.parse(getData));
  //     }
  //   }, [])
  //

  useEffect(() => {
    localStorage.setItem(localStorageName, JSON.stringify(taskList));
  },[taskList])

  return (
    <TaskManagerContext.Provider value={taskList}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HeaderBar/>}>
            <Route index={true} element={<TaskHome onAddTask={addTask}/>} />
            <Route path={"/archived"} element={<></>} />
            <Route path={"/analysis"} element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskManagerContext.Provider>
  )
}

export default App
