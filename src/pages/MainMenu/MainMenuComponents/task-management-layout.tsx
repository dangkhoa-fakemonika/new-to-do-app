import {DropdownMenu} from "radix-ui";
import {useTaskManagerContext} from "@/globals/context.ts";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState, getSortedRowModel
} from "@tanstack/react-table";
import type {Task} from "@/classes/Task-class.ts";
import {useCallback, useMemo, useState} from "react";
import {MagnifyingGlassIcon, PlusIcon, CheckIcon} from "@radix-ui/react-icons";
import PopOverButton from "@/components/pop-over-button.tsx";
import AddTaskBody from "@/pages/MainMenu/MainMenuComponents/add-task-body.tsx";
import TaskTable from "@/pages/MainMenu/MainMenuComponents/task-table.tsx";
import {Spinner} from "@radix-ui/themes";
import TaskInfo from "@/pages/MainMenu/MainMenuComponents/task-info.tsx";
import TaskTableHeader from "@/pages/MainMenu/MainMenuComponents/task-table-header.tsx";

interface TaskTableProps {
  updateTask: (task: Task | Task[], action?: "new" | "update" | "delete" | "archive") => void,
}

function TaskManagementLayout(props: TaskTableProps) {
  const taskList = useTaskManagerContext();
  const taskColumnHelper = createColumnHelper<Task>();
  const [filterWord, setFilterWord] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [sorting, setSorting] = useState<SortingState>([]);

  new Promise(r => setTimeout(r, 2000)).then(() => {setIsLoading(false)});

  useMemo(() => {
    setColumnFilters(
      prevState => prevState.filter(f => f.id !== "task_name").concat({
        id: "task_name",
        value: filterWord.trim()
      })
    )
  }, [filterWord])

  useMemo(() => {
    setColumnFilters(
      prevState => prevState.filter(f => f.id !== "task_status").concat({
        id: "task_status",
        value: filterStatus !== "All" ? filterStatus : ""
      })
    )
  }, [filterStatus])

  const getSortingState = useCallback((id : string) => {
    const sortResult = sorting.find(s => s.id === id);
    return sortResult === undefined ? "none" : sortResult.desc ? "desc" : "asc";
  },[sorting])

  const toggleSorting = useCallback((id : string) => {
    const sortingState = getSortingState(id);

    const sortingMap = {
      "none" : "asc",
      "asc" : "desc",
      "desc" : "none"
    }

    const desc = sortingMap[sortingState];
    setSorting(prevState => {
      return desc !== "none" ?
       prevState.filter(f => f.id !== id).concat({
        id : id,
        desc : desc === "desc"
      }) : prevState.filter(f => f.id !== id)
    })
  }, [getSortingState]);

  const taskColumns = useMemo(() => [
    taskColumnHelper.accessor('task_name', {
      header: () => (<TaskTableHeader onClick={() => {toggleSorting("task_name")}} state={getSortingState("task_name")}>Name</TaskTableHeader>),
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_created', {
      header: () => (<TaskTableHeader onClick={() => {toggleSorting("task_created")}} state={getSortingState("task_created")}>Created On</TaskTableHeader>),
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_date', {
      header: () => (<TaskTableHeader onClick={() => {toggleSorting("task_date")}} state={getSortingState("task_date")}>Deadline</TaskTableHeader>),
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_status', {
      header: () => (<TaskTableHeader onClick={() => {toggleSorting("task_status")}} state={getSortingState("task_status")}>Status</TaskTableHeader>),
      cell: info => <div className={`rounded px-2 py-0.5 ${
        info.getValue() === "Finished" ? "bg-green-300" :
        info.getValue() === "Expired" ? "bg-red-300" :
        info.getValue() === "On Progress" ? "bg-yellow-300" :
          "bg-purple-300"
      } w-fit`}>{info.getValue()}
      </div>,
      footer: info => info.column.id
    }),

  ], [getSortingState, taskColumnHelper, toggleSorting]);

  const taskTable =
    useReactTable({
      data: taskList,
      columns: taskColumns,
      state: {
        columnFilters : columnFilters,
        sorting : sorting
      },
      onSortingChange: setSorting,
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel : getSortedRowModel(),
      enableMultiRowSelection: true,
      // manualFiltering: true,
    });

  const deleteSelectedTask = () => {
    const selectedTasks: Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    props.updateTask(selectedTasks, "delete");
    taskTable.toggleAllRowsSelected(false);
  }

  const debugPrint = () => {
    const selectedTasks: Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    console.log(selectedTasks);
  }

  const selectTask = (task : Task) => {
    setSelectedTask(task);
  }

  return (
    <div className={"flex flex-col justify-center"}>
      <label
        className={"w-full flex flex-row gap-2 justify-center content-center items-center p-2 border-2 border-blue-100 rounded-lg focus:border-blue-300"}>
        <MagnifyingGlassIcon height="16" width="16"/>
        <input
          className={"w-full form-input border-transparent focus:border-transparent focus:ring-0 'focus:border-none focus:outline-none"}
          placeholder={"Enter task name..."} type={"text"} value={filterWord} onChange={event => {
          setFilterWord(event.target.value);
        }}/>
      </label>

      <div className={"flex flex-row gap-2 justify-between my-2"}>
        <div className={"flex flex-row justify-start gap-2"}>
          <PopOverButton trigger={<button
            className={"flex flex-row items-center content-center gap-2 bg-blue-400 text-white py-1 px-3 font-medium rounded hover:cursor-pointer"}>
            <PlusIcon/> Add a task</button>}>
            <AddTaskBody onAddTask={props.updateTask}/>
          </PopOverButton>
          <button
            className={"flex flex-row items-center content-center gap-2 bg-red-400 text-white py-1 px-3 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"}
            disabled={!taskTable.getIsSomeRowsSelected() && !taskTable.getIsAllRowsSelected()} onClick={() => {
            deleteSelectedTask()
          }}>
            Delete selected tasks
          </button>
          <button
            className={"flex flex-row items-center content-center gap-2 bg-green-700 text-white py-1 px-3 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"}
            disabled={!taskTable.getIsSomeRowsSelected() && !taskTable.getIsAllRowsSelected()} onClick={() => {
            debugPrint()
          }}>
            Mark all selected tasks as done
          </button>
        </div>

        <div className={"flex flex-row gap-2 justify-end"}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div className={"flex flex-row items-center content-center gap-2 bg-blue-700 text-white py-1 px-3 font-medium rounded disabled:bg-gray-400 hover:cursor-pointer"}>
                Status
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={"w-[200px] bg-white z-50 border rounded shadow p-2"}>

              {["All", "On Progress", "Finished", "Expired"].map(option => (
                <DropdownMenu.Item
                  className={"flex flex-row justify-between py-1 px-1.5 items-center hover:border-none hover:outline-none hover:ring-0 hover:bg-gray-200 hover:rounded"}
                  onClick={() => {
                    setFilterStatus(option)
                  }}>
                  {option}
                  {filterStatus === option ? <CheckIcon scale={"50px"}/> : <></>}
                </DropdownMenu.Item>
              ))}

            </DropdownMenu.Content>
          </DropdownMenu.Root>

        </div>
      </div>

      <div>
        {
        isLoading ?
        <div className={"flex flex-row gap-2 m-auto w-full h-full text-center items-center justify-center"}>
          Loading data, please wait <Spinner/>
        </div> :
        <div className={"grid grid-cols-3 gap-2"}>
          <div className={"col-span-2"}>
            <TaskTable taskTable={taskTable} updateTask={props.updateTask} selectTask={selectTask} sortingHandle={toggleSorting}/>
          </div>
          <TaskInfo taskInfo={selectedTask}/>

        </div>
      }
      </div>
    </div>
  );
}

export default TaskManagementLayout;
