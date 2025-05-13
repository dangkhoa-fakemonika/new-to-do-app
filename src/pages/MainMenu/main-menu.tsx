import TaskTable from "./MainMenuComponents/task-table.tsx";
import {type Task, TaskSchema} from "@/classes/Task-class.ts";
import {TaskManagerContext} from "@/globals/context.ts";
import {useEffect, useState} from "react";
import {Spinner} from "@radix-ui/themes";


function TaskHome() {
  const localStorageName = "to_do_list_data";
  const archivedStorageName = "archived_data";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskList, setTaskList] = useState<Task[]>(() => {
    setIsLoading(true);
    const getData = localStorage.getItem(localStorageName);
    let returnData;
    if (getData == null){
      localStorage.setItem(localStorageName, JSON.stringify([]))
      returnData = [];
    }
    else {
      returnData = JSON.parse(getData);
    }

    new Promise(r => setTimeout(r, 2000)).then(() => {setIsLoading(false)});
    // setIsLoading(false);
    return returnData;
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
      {isLoading ?
        <div className={"flex flex-row gap-2 m-auto w-full h-full text-center items-center justify-center"}>
            Loading data, please wait <Spinner/>
        </div> :
        <TaskTable onAddTask={addTask}/>
      }
    </TaskManagerContext.Provider>
  </>)
}

export default TaskHome
