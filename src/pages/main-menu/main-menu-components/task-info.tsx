import type {Task} from "@/classes/Task-class.ts";
import type {ReactNode} from "react";

interface TaskInfoProps {
  taskInfo: Task
}

function TaskInfo(props: TaskInfoProps) : ReactNode {


  return (
    <div className={"h-fit flex flex-col"}>
      <div className={"grid grid-cols-5 gap-3 border border-gray-200 rounded-lg p-2 w-full shadow"}>
        <span className={"col-span-2 p-1"}>Task Name</span>
        <span className={"col-span-3 border rounded border-gray-300 p-1"}>{props.taskInfo.task_name}</span>
        <span className={"col-span-2 p-1"}>Task Description</span>
        <span className={"col-span-3 border rounded border-gray-300 p-1"}>{props.taskInfo.task_description}</span>
        <span className={"col-span-2 p-1"}>Task Status</span>
        <span className={"col-span-3 border rounded border-gray-300 p-1"}>{props.taskInfo.task_status}</span>
      </div>
    </div>
  )
}

export default TaskInfo
