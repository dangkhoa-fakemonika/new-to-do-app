import {createContext, useContext} from "react";
import type {TaskController} from "@/services/services.ts";

export const TaskControllerContext = createContext<TaskController | undefined>(undefined);

export function useTaskControllerContext(){
  const context = useContext(TaskControllerContext);

  if (context === undefined){
    throw Error("No task controller");
  }

  return context;
}
