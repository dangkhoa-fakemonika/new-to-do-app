import {Button, Flex, Text, TextField} from "@radix-ui/themes";
import {useForm, type SubmitHandler} from "react-hook-form"
import type {Task} from "@/data_classes/Task-class.ts";

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
      <Flex gap={"2"} direction={"column"}>
        <Text>Task name</Text>
        <TextField.Root placeholder="Task Name" defaultValue={props.taskData?.task_name} {...register("task_name", {required: true})} />
        <Text>Task description</Text>
        <TextField.Root placeholder="Task Description" defaultValue={props.taskData?.task_description} {...register("task_description")} type={"text"}/>
        <Text>Deadline</Text>
        <TextField.Root placeholder="Date" {...register("task_date")}
                        type={"date"}/>

        {(errors.task_name || errors.task_name) && <Text>This field is required</Text>}
          <Button type={"submit"}>Add</Button>
      </Flex>
    </form>
  )
}

export default AddTaskBody;
