import {useForm, type SubmitHandler} from "react-hook-form"
import {type Task} from "@/classes/Task-class.ts";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useTaskControllerContext} from "@/globals/context.ts";

interface AddTaskBodyProps{
  parentState? : Dispatch<SetStateAction<boolean>>
}


function AddTaskBody(props: AddTaskBodyProps) : ReactNode {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Task>()

  const taskController = useTaskControllerContext();

  const onSubmit: SubmitHandler<Task> = (data) => {
    // props.onAddTask(data);
    taskController.changeTaskListAction(taskController.addTask(data));
    if (props.parentState !== undefined){
      props.parentState(false);
      // close
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={""}>
      <div className={"flex flex-col gap-2 w-full lg:w-[250px]"}>
        <label>Task name</label>
        <input className={"px-2 py-1 border-2 w-full border-black-500"} placeholder="Task Name"  {...register("task_name", {required: true})} type={"text"} />

        {(errors.task_name) && <span className={"text-red-400"}>Please enter a name for the task</span>}
        <label>Task description</label>
        <input className={"px-2 py-1 border-2 w-full border-black-500"} placeholder="Task Description" {...register("task_description")} type={"text"}/>
        <label>Deadline</label>
        <input className={"px-2 py-1 border-2 w-full border-black-500"} placeholder="Date" {...register("task_date", {required: true})} type={"date"}/>
        {(errors.task_date) && <span className={"text-red-400"}>Please enter a date</span>}
        <button className={"text-center bg-blue-400 p-1 rounded text-white font-medium"} type={"submit"}>Add</button>
      </div>
    </form>
  )
}

export default AddTaskBody;
