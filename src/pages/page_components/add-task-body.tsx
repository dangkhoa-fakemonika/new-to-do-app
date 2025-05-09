import {Button, Flex, Text, TextField} from "@radix-ui/themes";
import {useForm, type SubmitHandler} from "react-hook-form"
import type {Task} from "@/data_classes/Task-class.ts";

// import {useTaskManagerContext} from "@/context.ts";

interface AddTaskBodyProps {
  onAddTask: (data: Task) => void
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
    props.onAddTask(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={"2"} direction={"column"}>
        <TextField.Root placeholder="Task Name" {...register("task_name", {required: true})} />
        <TextField.Root placeholder="Task Description" {...register("task_description")} type={"text"}/>
        <TextField.Root placeholder="Date" {...register("task_date")}
                        type={"date"}/>

        {(errors.task_name || errors.task_name) && <Text>This field is required</Text>}
          <Button type={"submit"}>Add</Button>
      </Flex>
    </form>
  )
}

export default AddTaskBody;
