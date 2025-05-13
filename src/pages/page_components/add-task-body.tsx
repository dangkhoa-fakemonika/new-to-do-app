import {useForm, type SubmitHandler} from "react-hook-form"
import type {Task} from "@/classes/Task-class.ts";

// import {useTaskManagerContext} from "@/context.ts";

interface AddTaskBodyProps {
  onAddTask: (data: Task, action? : "new" | "update" | "delete") => void
  taskData? : Task
}

function AddTaskBody(props: AddTaskBodyProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Task>()

  // const taskList = useTaskManagerContext();

  const onSubmit: SubmitHandler<Task> = (data) => {
    if (props.taskData === undefined){
      props.onAddTask(data, "new");
      reset();
    }
    else {
      props.onAddTask({...props.taskData, task_name: data.task_name, task_description: data.task_description}, "update");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex flex-col gap-2 w-[350px]"}>
        <label>Task name</label>
        <input className={"px-2 py-1 border-2 w-full border-black-500"} placeholder="Task Name" defaultValue={props.taskData?.task_name} {...register("task_name", {required: true})} type={"text"} />

        {(errors.task_name) && <span className={"text-red-400"}>Please enter a name for the task</span>}
        <label>Task description</label>
        <input className={"px-2 py-1 border-2 w-full border-black-500"} placeholder="Task Description" defaultValue={props.taskData?.task_description} {...register("task_description")} type={"text"}/>
        <label>Deadline</label>
        <input className={"px-2 py-1 border-2 w-full border-black-500"} placeholder="Date" {...register("task_date", {required: true})} type={"date"}/>
        {(errors.task_date) && <span className={"text-red-400"}>Please enter a date</span>}
        <button className={"text-center bg-blue-400 p-1 rounded text-white font-medium"} type={"submit"}>Add</button>
      </div>
    </form>
  )
}

export default AddTaskBody;
