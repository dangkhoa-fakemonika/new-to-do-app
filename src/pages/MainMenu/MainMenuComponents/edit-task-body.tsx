import {useForm, type SubmitHandler, Controller} from "react-hook-form"
import type {Task} from "@/classes/Task-class.ts";
import {RadioGroup} from "radix-ui";

// import {useTaskManagerContext} from "@/context.ts";

interface EditTaskBodyProps {
  updateTask: (data: Task, action?: "new" | "update" | "delete") => void
  taskData: Task
}

function EditTaskBody(props: EditTaskBodyProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Task>({
    defaultValues : {
      task_status: props.taskData.task_status
    }
  })

  const onSubmit: SubmitHandler<Task> = (data) => {
    props.updateTask({
      ...props.taskData,
      task_name: data.task_name,
      task_description: data.task_description,
      task_status: data.task_status
    }, "update");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"grid grid-cols-5 gap-3 border border-gray-200 rounded-lg p-2 w-full shadow"}>
          <label className={"col-span-2 p-1"}>Task name</label>
          <input className={"col-span-3 border rounded border-gray-300 p-1"} placeholder="Task Name"
                 defaultValue={props.taskData.task_name} {...register("task_name", {required: true})} type={"text"}/>

          {(errors.task_name) &&
            <span className={"text-red-400 col-span-5 px-1"}>Please enter a name for the task</span>}
          <label className={"col-span-2 p-1"}>Task description</label>
          <input className={"col-span-3 border rounded border-gray-300 p-1"} placeholder="Task Description"
                 defaultValue={props.taskData.task_description} {...register("task_description")} type={"text"}/>
          <Controller render={({field : {onChange , onBlur, value}}) =>
            (<RadioGroup.Root className={"flex flex-row col-span-5 justify-around py-1"}
                             value={value} onValueChange={onChange} onBlur={onBlur}>
              {["On Progress", "Finished", "Expired"].map(stat => (
                <div key={stat} className={"flex items-center gap-2"}>
                  <RadioGroup.Item value={stat}
                                   className={"size-[25px] cursor-pointer rounded-full border border-gray-400 bg-white outline-none hover:bg-gray-100 focus:shadow"}>
                    <RadioGroup.Indicator
                      className={"relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-gray-500"}/>
                  </RadioGroup.Item>
                  <label>{stat}</label>
                </div>
              ))
              }
            </RadioGroup.Root>)
          } name={"task_status"} control={control} rules={{required: true}}>
          </Controller>
        </div>
        <button
          className={"h-fit flex flex-col text-center border border-gray-200 rounded-lg p-2 bg-green-400 text-white font-medium mt-1 w-full shadow cursor-pointer"}
          type={"submit"}>Save
        </button>
      </form>
    </div>
  )
}

export default EditTaskBody;
