import TaskTable from "./page_components/task-table.tsx";
import SearchTextView from "./page_components/text-view-search.tsx";
import HomeToolBar from "@/pages/page_components/toolbar.tsx";
import type {Task} from "@/data_classes/Task-class.ts";

interface TaskHomeProps {
  onAddTask: (new_task: Task) => void
}

function TaskHome(props : TaskHomeProps) {
  //
  // const [taskList] = useState(useTaskManagerContext());
  // let newTaskList = taskList;
  //
  // const handleSearch = (text: string) => {
  //   newTaskList = taskList.filter(task => {
  //     text.trim().length !== 0 ? task.task_name.includes(text) : true
  //   })
  // }

  return (<>
    <SearchTextView onChange={(text) => {console.log(text)}}/>
    <HomeToolBar onAddTask={props.onAddTask}/>
    <TaskTable/>
  </>)
}

export default TaskHome
