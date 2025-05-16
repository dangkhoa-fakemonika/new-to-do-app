import TaskManagementLayout from "@/pages/main-menu/main-menu-components/task-management-layout.tsx";
import {type Task} from "@/classes/Task-class.ts";
import {TaskControllerContext} from "@/globals/context.ts";
import {type ReactNode, useEffect, useState} from "react";
import {TaskController} from "@/services/services.ts";


function TaskHome(): ReactNode {
  const localStorageName = "to_do_list_data";
  const archivedStorageName = "archived_data";
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const getData = localStorage.getItem(localStorageName);
    let returnData;
    if (getData == null){
      localStorage.setItem(localStorageName, JSON.stringify([]))
      returnData = [];
    }
    else {
      returnData = JSON.parse(getData);
    }

    return returnData;
  });

  const taskController = new TaskController(taskList, setTaskList, archivedStorageName);

  useEffect(() => {
    localStorage.setItem(localStorageName, JSON.stringify(taskList));
  },[taskList])


  return (<>
    <TaskControllerContext.Provider value={taskController}>
      {
        <TaskManagementLayout/>
      }
    </TaskControllerContext.Provider>
  </>)
}

export default TaskHome
