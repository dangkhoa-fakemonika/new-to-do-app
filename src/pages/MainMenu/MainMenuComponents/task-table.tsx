import {flexRender, type Table} from "@tanstack/react-table";
import {ContextMenu} from "radix-ui";
import type {Task} from "@/classes/Task-class.ts";

interface TaskTableProps {
  taskTable: Table<Task>,
  updateTask: (task: Task | Task[], action?: "new" | "update" | "delete" | "archive") => void,
  selectTask: (task: Task) => void,
  sortingHandle: (id: string, desc: boolean) => void
}

function TaskTable(props: TaskTableProps) {
  const changeStatus = (task: Task, newStatus: "On Progress" | "Finished" | "Expired") => {
    task.task_status = newStatus;
    props.updateTask(task, "update");
  }

  const deleteTask = (task: Task) => {
    props.updateTask(task, "delete");
  }

  return (
    <>
      <table className={"w-full content-center"}>
        <thead className={""}>
        {props.taskTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={"border border-gray-400 *:py-2"}>
            <th>
              <input type={"checkbox"}
                     checked={props.taskTable.getIsAllRowsSelected()}
                     onClick={props.taskTable.getToggleAllRowsSelectedHandler()}
                     onChange={props.taskTable.getToggleAllRowsSelectedHandler()}
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
        {props.taskTable.getRowModel().rows.map(row => (
          <tr key={row.id} className={"*:py-2 *:border-b hover:rounded hover:bg-gray-100"} onClick={() => {
            props.selectTask(row.original)
          }}>
            <td className={"text-center"}>
              <input type={"checkbox"}
                     checked={row.getIsSelected()}
                     disabled={!row.getCanSelect()}
                     onClick={row.getToggleSelectedHandler()}
                     onChange={row.getToggleSelectedHandler()}
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
                          <ContextMenu.SubTrigger className={"py-1 px-2 hover:rounded hover:bg-gray-300"}>Mark
                            as</ContextMenu.SubTrigger>
                          <ContextMenu.SubContent
                            className={"flex flex-col w-fit bg-white shadow rounded z-50 p-2 *:p-1 *:hover:rounded *:hover:bg-gray-300"}>
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
                          <ContextMenu.Item onClick={() => {
                            deleteTask(row.original)
                          }}>
                            Delete
                          </ContextMenu.Item>
                          <ContextMenu.Item onClick={() => {
                            props.updateTask(row.original, "archive")
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
    </>
  )
}

export default TaskTable
