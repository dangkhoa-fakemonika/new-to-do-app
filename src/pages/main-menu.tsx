import TaskTable from "./page_components/task-table.tsx";
import {type Task, TaskSchema} from "@/data_classes/Task-class.ts";
import {TaskManagerContext} from "@/context.ts";
import {useEffect, useState} from "react";


function TaskHome() {
  const localStorageName = "to_do_list_data";
  const archivedStorageName = "archived_data";
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

  const addTask = (new_task : Task | Task[], action : "new" | "update" | "delete" | "archive" = "new")=> {
    let newState = [...taskList];

    if (action === "new"){
      if (Array.isArray(new_task))
        newState = newState.concat(new_task.map((task_unit) => {return {...task_unit, task_id: Math.floor((Math.random() * 1000000000) + 1)}}));
      else{
        const result = TaskSchema.parse(new_task);
        result.task_id = Math.floor((Math.random() * 1000000000) + 1);
        newState.push(result);
      }
    }
    else if (action === "update"){
      newState.map((task) => {
        const result = TaskSchema.parse(new_task);
        if (task.task_id === result.task_id)
          return {...result};
        else
          return task;
      })
    }
    else if (action === "delete"){
      if (Array.isArray(new_task))
        newState = newState.filter(task => !new_task.map(task_inner => task_inner.task_id).includes(task.task_id));
      else{
        const result = TaskSchema.parse(new_task);
        newState = newState.filter(task => task.task_id !== result.task_id);
      }
    }
    else if (action === "archive"){
      const result = TaskSchema.parse(new_task);
      newState = newState.filter(task => task.task_id !== result.task_id);
      const getArchivedData = localStorage.getItem(archivedStorageName);
      if (getArchivedData == null){
        localStorage.setItem(localStorageName, JSON.stringify([result]))
      }
      else {
        const tempData : Task[] = JSON.parse(getArchivedData);
        tempData.push(result);
        localStorage.setItem(archivedStorageName, JSON.stringify(tempData));
      }
    }
    setTaskList(newState);

  }

  useEffect(() => {
    localStorage.setItem(localStorageName, JSON.stringify(taskList));
  },[taskList])


  return (<>
    <TaskManagerContext.Provider value={taskList}>
      {/*<SearchTextView changeFilter={(text : string) => {console.log(text); setFilterWord(text)}}/>*/}
      {/*<TaskSearchContext.Provider value={filterWord}>*/}
      {/*  <HomeToolBar onAddTask={props.onAddTask}/>*/}
        <TaskTable onAddTask={addTask}/>
      {/*</TaskSearchContext.Provider>*/}
    </TaskManagerContext.Provider>
  </>)
}

export default TaskHome
