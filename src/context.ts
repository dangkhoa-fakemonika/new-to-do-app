import {createContext, useContext} from "react";
import type {Task} from "@/data_classes/Task-class.ts";

export const TaskManagerContext = createContext<Task[] | undefined>(undefined);


export function useTaskManagerContext() {
  const context = useContext(TaskManagerContext);

  if (context === undefined){
    throw Error("Nothing");
  }

  return context;
}

export const TaskSearchContext = createContext<string | undefined>(undefined);

export function useTaskSearchContext() {
  const context = useContext(TaskSearchContext);

  if (context === undefined){
    throw Error("Nothing");
  }

  return context;
}

