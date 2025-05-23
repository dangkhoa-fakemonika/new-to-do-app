import {type Task, TaskSchema} from "@/classes/Task-class.ts";
import type {Dispatch, SetStateAction} from "react";


class TaskController {
  public readonly taskList: Task[];
  public changeTaskListAction: Dispatch<SetStateAction<Task[]>>;
  private readonly archivedStorageName: string;

  public constructor(stateTaskList : Task[], setStateTaskList : Dispatch<SetStateAction<Task[]>>, archived : string) {
    this.taskList = stateTaskList;
    this.changeTaskListAction = setStateTaskList;
    this.archivedStorageName = archived;
  }

  public addTask(task: Task) {
    return (prevState : Task[]) => {
      const result = TaskSchema.parse(task);
      const nextState = [...prevState];
      result.task_id = Math.floor((Math.random() * 1000000000) + 1);
      nextState.push(result);
      return nextState;
    };
  }

  public addTasks(tasks: Task[]) {
    return (prevState : Task[]) => {
      const results = tasks.map((task) => {
        const resultTask = TaskSchema.parse(task);
        return {...resultTask, task_id: Math.floor((Math.random() * 1000000000) + 1)}
      });
      return prevState.concat(results);
    }
  }

  public editTask(task: Task) {
    return (prevState : Task[]) => {
      const result = TaskSchema.parse(task);
      return prevState.map((task) => {
        if (task.task_id === result.task_id){
          return result;
        }
        else
          return task;
      })
    }
  }

  public deleteTask(task: Task) {
    return (prevState : Task[]) => {
      return prevState.filter((taskItem) => taskItem.task_id !== task.task_id);
    }
  }

  public deleteTasks(tasks: Task[]) {
    return (prevState : Task[]) => {
      return prevState.filter(task => !tasks.map(taskItem => taskItem.task_id).includes(task.task_id));
    }
  }

  public archiveTask(task : Task){
    return (prevState : Task[]) => {
      const result = TaskSchema.parse(task);

      const getArchivedData = localStorage.getItem(this.archivedStorageName);
      if (getArchivedData == null){
        localStorage.setItem(this.archivedStorageName, JSON.stringify([result]))
      }
      else {
        const tempData : Task[] = JSON.parse(getArchivedData);
        tempData.push(result);
        localStorage.setItem(this.archivedStorageName, JSON.stringify(tempData));
      }

      return prevState.filter(task => task.task_id !== result.task_id);
    }

  }
}

export default TaskController;
