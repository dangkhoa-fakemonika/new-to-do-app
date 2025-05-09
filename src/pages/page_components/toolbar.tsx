import {Button, Flex} from "@radix-ui/themes";
import {PlusIcon} from "@radix-ui/react-icons";
import "@/index.css";
import PopOverButton from "@/pages/page_components/pop-over-button.tsx";
import AddTaskBody from "@/pages/page_components/add-task-body.tsx";
import type {Task} from "@/data_classes/Task-class.ts";

interface HomeToolBarProps {
  onAddTask: ((new_task: Task) => void)
}

function HomeToolBar(props: HomeToolBarProps) {

  return (<>
    <Flex gap={"2"} justify={"start"} my={"2"}>
      <PopOverButton buttonInner={<><PlusIcon/> Add a task</>}>
        <AddTaskBody onAddTask={props.onAddTask}/>
      </PopOverButton>
      <Button>
        Select all tasks
      </Button>
      <Button>
        Delete tasks
      </Button>
      <Button>
        Delete all selected tasks
      </Button>
    </Flex>
  </>)
}

export default HomeToolBar
