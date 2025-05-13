import {DropdownMenu, ContextMenu} from "radix-ui";
import {useTaskManagerContext} from "@/globals/context.ts";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState
} from "@tanstack/react-table";
import type {Task} from "@/classes/Task-class.ts";
import {useMemo, useState} from "react";
import {MagnifyingGlassIcon, PlusIcon, CheckIcon} from "@radix-ui/react-icons";
import PopOverButton from "@/pages/page_components/pop-over-button.tsx";
import AddTaskBody from "@/pages/page_components/add-task-body.tsx";

interface TaskTableProps {
  onAddTask: (task: Task | Task[], action?: "new" | "update" | "delete" | "archive") => void,
}

function TaskTable(props: TaskTableProps) {

  const taskList = useTaskManagerContext();
  const taskColumnHelper = createColumnHelper<Task>();
  const [filterWord, setFilterWord] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");

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


  const taskColumns = useMemo(() => [
    taskColumnHelper.accessor('task_name', {
      header: () => "Name",
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_created', {
      header: () => "Created",
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_date', {
      header: () => "Deadline",
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

    taskColumnHelper.accessor('task_status', {
      header: () => "Status",
      cell: info => <div className={`rounded px-2 py-0.5 ${
        info.getValue() === "Finished" ? "bg-green-300" :
        info.getValue() === "Expired" ? "bg-red-300" :
        info.getValue() === "On Progress" ? "bg-yellow-300" :
          "bg-purple-300"
      } w-fit`}>{info.getValue()}
      </div>,
      footer: info => info.column.id
    }),

  ], [taskColumnHelper])

  const taskTable =
    useReactTable({
      data: taskList,
      columns: taskColumns,
      state: {
        columnFilters
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      enableMultiRowSelection: true,
      // manualFiltering: true,
    });

  const changeStatus = (task: Task, newStatus: "On Progress" | "Finished" | "Expired") => {
    task.task_status = newStatus;
    props.onAddTask(task, "update");
  }

  const deleteTask = (task: Task) => {
    props.onAddTask(task, "delete");
  }

  const deleteSelectedTask = () => {
    const selectedTasks: Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    props.onAddTask(selectedTasks, "delete");
    taskTable.toggleAllRowsSelected(false);
  }

  const debugPrint = () => {
    const selectedTasks: Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    console.log(selectedTasks);
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
            <AddTaskBody onAddTask={props.onAddTask}/>
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

      <table className={"w-2/3 mx-auto content-center"}>
        <thead className={""}>
        {taskTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={"border border-gray-400 *:py-2"}>
            <th>
              <input type={"checkbox"}
                     checked={taskTable.getIsAllRowsSelected()}
                     onClick={taskTable.getToggleAllRowsSelectedHandler()}
              />
            </th>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
        </thead>

        <tbody className={"w-full"}>
        {taskTable.getRowModel().rows.map(row => (
          <tr key={row.id} className={"*:py-2 *:border-b hover:rounded hover:bg-gray-100"}>
            <td className={"text-center"}>
              <input type={"checkbox"}
                     checked={row.getIsSelected()}
                     disabled={!row.getCanSelect()}
                     onClick={row.getToggleSelectedHandler()}
              />
            </td>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {
                  <ContextMenu.Root key={row.id}>
                    <ContextMenu.Trigger>
                      <div className={"w-full"}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Portal>
                      <ContextMenu.Content className={"flex flex-col w-fit bg-white z-45 shadow rounded p-2"}>
                        <ContextMenu.Sub>
                          <ContextMenu.SubTrigger className={"py-1 px-2 hover:rounded hover:bg-gray-300"}>Mark as</ContextMenu.SubTrigger>
                          <ContextMenu.SubContent className={"flex flex-col w-fit bg-white shadow rounded z-50 p-2 *:p-1 *:hover:rounded *:hover:bg-gray-300"}>
                            {row.original.task_status !== "On Progress" ?
                              <ContextMenu.Item onClick={() => changeStatus(row.original, "On Progress")}>On
                                Progress</ContextMenu.Item> : <></>}
                            {row.original.task_status !== "Expired" ? <ContextMenu.Item
                              onClick={() => changeStatus(row.original, "Expired")}>Expired</ContextMenu.Item> : <></>}
                            {row.original.task_status !== "Finished" ? <ContextMenu.Item
                              onClick={() => changeStatus(row.original, "Finished")}>Finished</ContextMenu.Item> : <></>}
                          </ContextMenu.SubContent>
                        </ContextMenu.Sub>

                        <div className={"*:hover:rounded *:hover:bg-gray-300 *:py-1 *:px-2"}>
                          <ContextMenu.Item>See info</ContextMenu.Item>
                          <ContextMenu.Item onClick={() => {
                            deleteTask(row.original)
                          }}>
                            Delete
                          </ContextMenu.Item>
                          <ContextMenu.Item onClick={() => {
                            props.onAddTask(row.original, "archive")
                          }}>
                            Move to Archived
                          </ContextMenu.Item>
                        </div>
                      </ContextMenu.Content>
                    </ContextMenu.Portal>
                  </ContextMenu.Root>
                }
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
