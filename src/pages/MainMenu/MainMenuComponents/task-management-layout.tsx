import {DropdownMenu} from "radix-ui";
import {useTaskControllerContext,} from "@/globals/context.ts";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState, getSortedRowModel
} from "@tanstack/react-table";
import type {Task} from "@/classes/Task-class.ts";
import {type ReactNode, useCallback, useMemo, useState} from "react";
import {MagnifyingGlassIcon, PlusIcon, CheckIcon, Cross1Icon} from "@radix-ui/react-icons";
import PopOverButton from "@/components/pop-over-button.tsx";
import AddTaskBody from "@/pages/MainMenu/MainMenuComponents/add-task-body.tsx";
import TaskTable from "@/pages/MainMenu/MainMenuComponents/TaskTable/task-table.tsx";
import TaskInfo from "@/pages/MainMenu/MainMenuComponents/task-info.tsx";
import TaskTableHeader from "@/pages/MainMenu/MainMenuComponents/TaskTable/task-table-header.tsx";
import EditTaskBody from "@/pages/MainMenu/MainMenuComponents/edit-task-body.tsx";
import LoadingTaskTable from "@/pages/MainMenu/MainMenuComponents/TaskTable/loading-task-table.tsx";

function TaskManagementLayout(): ReactNode {
  const taskColumnHelper = createColumnHelper<Task>();
  const [filterWord, setFilterWord] = useState<string>("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const myTaskController = useTaskControllerContext();
  const taskList = myTaskController.taskList;

  new Promise(r => setTimeout(r, 4000)).then(() => {
    setIsLoading(false)
  });

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

  useMemo(() => {
    setIsEditing(false);
  }, [selectedTask])

  const getSortingState = useCallback((id: string) => {
    const sortResult = sorting.find(s => s.id === id);
    return sortResult === undefined ? "none" : sortResult.desc ? "desc" : "asc";
  }, [sorting])

  const toggleSorting = useCallback((id: string) => {
    const sortingState = getSortingState(id);

    const sortingMap = {
      "none": "asc",
      "asc": "desc",
      "desc": "none"
    }

    const desc = sortingMap[sortingState];
    setSorting(prevState => {
      return desc !== "none" ?
        prevState.filter(f => f.id !== id).concat({
          id: id,
          desc: desc === "desc"
        }) : prevState.filter(f => f.id !== id)
    })
  }, [getSortingState]);

  const taskColumns = useMemo(() => [
    taskColumnHelper.accessor('task_name', {
      header: () => (<TaskTableHeader onClick={() => {
        toggleSorting("task_name")
      }} state={getSortingState("task_name")}>Name</TaskTableHeader>),
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_created', {
      header: () => (<TaskTableHeader onClick={() => {
        toggleSorting("task_created")
      }} state={getSortingState("task_created")}>Created On</TaskTableHeader>),
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_date', {
      header: () => (<TaskTableHeader onClick={() => {
        toggleSorting("task_date")
      }} state={getSortingState("task_date")}>Deadline</TaskTableHeader>),
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_status', {
      header: () => (<TaskTableHeader onClick={() => {
        toggleSorting("task_status")
      }} state={getSortingState("task_status")}>Status</TaskTableHeader>),
      cell: info => <div className={`rounded px-2 py-0.5 whitespace-nowrap ${
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
        columnFilters: columnFilters,
        sorting: sorting
      },
      onSortingChange: setSorting,
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      enableMultiRowSelection: true,
      // manualFiltering: true,
    });

  const deleteSelectedTask = () => {
    const selectedTasks: Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    myTaskController.changeTaskListAction(myTaskController.deleteTasks(selectedTasks));
    taskTable.toggleAllRowsSelected(false);
  }

  const debugPrint = () => {
    const selectedTasks: Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    console.log(selectedTasks);
  }

  const selectTask = (task: Task) => {
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
          <PopOverButton trigger={<div
            className={"flex flex-row items-center content-center gap-2 bg-blue-400 text-white py-1 px-3 font-medium rounded hover:cursor-pointer"}>
            <PlusIcon className={"my-2"}/> <div className={"hidden md:inline-block"}>Add a task</div></div>}>
            <AddTaskBody/>
          </PopOverButton>
          <button
            className={"flex flex-row items-center content-center gap-2 bg-red-400 text-white py-1 px-3 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"}
            disabled={!taskTable.getIsSomeRowsSelected() && !taskTable.getIsAllRowsSelected()} onClick={() => {
            deleteSelectedTask()
          }}>
            <Cross1Icon/> <div className={"hidden md:inline-block"}>Delete selected tasks</div>
          </button>
          <button
            className={"flex flex-row items-center content-center gap-2 bg-green-700 text-white py-1 px-3 font-medium rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"}
            disabled={!taskTable.getIsSomeRowsSelected() && !taskTable.getIsAllRowsSelected()} onClick={() => {
            debugPrint()
          }}>
            <CheckIcon/> <div className={"hidden md:inline-block"}>Mark all selected tasks as done</div>
          </button>
        </div>

        <div className={"flex flex-row gap-2 justify-end"}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div
                className={"flex flex-row items-center content-center gap-2 bg-blue-700 text-white py-1 px-3 font-medium rounded disabled:bg-gray-400 hover:cursor-pointer"}>
                Status
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={"w-[200px] bg-white z-50 border rounded shadow p-2"}>

              {["All", "On Progress", "Finished", "Expired"].map(option => (
                <DropdownMenu.Item
                  key={option}
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
              <div className={"flex flex-col w-full md:grid md:grid-cols-3 md:gap-2"}>
                <div className={"md:col-span-2"}>
                  <LoadingTaskTable/>
                </div>
              </div>
            :
            <div className={"flex flex-col-reverse w-full md:grid md:grid-cols-3 gap-2"}>
              <div className={"md:col-span-2 overflow-x-auto"}>
                <TaskTable taskTable={taskTable} selectTask={selectTask}
                           sortingHandle={toggleSorting}/>
              </div>
              {
                selectedTask ? !isEditing ?
                    <div className={"h-fit flex flex-col"}>
                      <TaskInfo taskInfo={selectedTask} />
                      <button onClick={() => {
                        setIsEditing(prevState => !prevState)
                      }}
                              className={"text-center my-1 py-2 w-full bg-blue-400 rounded-lg text-white font-medium shadow cursor-pointer"}>
                        Edit Task Info
                      </button>
                      <button onClick={() => {
                        setSelectedTask(undefined)
                      }}
                              className={"text-center my-1 py-2 w-full bg-red-400 rounded-lg text-white font-medium shadow cursor-pointer"}>
                        Exit
                      </button>
                    </div> :
                    <div className={"h-fit flex flex-col"}>
                      <EditTaskBody taskData={selectedTask}/>
                      <button onClick={() => {
                        setIsEditing(prevState => !prevState)
                      }}
                              className={"text-center my-1 py-2 w-full bg-red-400 rounded-lg text-white font-medium shadow cursor-pointer"}>
                        Close Edit
                      </button>
                    </div> :
                  <div
                    className={"h-fit flex flex-col text-center border border-gray-200 rounded-lg p-2 w-full shadow"}>
                    Select a task to see its info.
                  </div>
              }
            </div>
        }
      </div>
    </div>
  );
}

export default TaskManagementLayout;
