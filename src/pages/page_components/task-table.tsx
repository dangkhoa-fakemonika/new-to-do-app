import {Table, Badge, ContextMenu, Button, Checkbox, TextField, IconButton, Flex} from "@radix-ui/themes"
import {useTaskManagerContext} from "@/context.ts";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {Task} from "@/data_classes/Task-class.ts";
import {useMemo, useState} from "react";
import {DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon} from "@radix-ui/react-icons";
import PopOverButton from "@/pages/page_components/pop-over-button.tsx";
import AddTaskBody from "@/pages/page_components/add-task-body.tsx";

interface TaskTableProps{
  onAddTask: (task: Task | Task[], action?: "new" | "update" | "delete" | "archive") => void,
}

function TaskTable(props : TaskTableProps) {

  const taskList = useTaskManagerContext();
  const taskColumnHelper = createColumnHelper<Task>();
  const [filterWord, setFilterWord] = useState<string>("");

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
      cell: info =>  <Badge color={info.getValue() === "On Progress" ? "yellow" : info.getValue() === "Finished" ? "green" : "red" }>{info.getValue()}</Badge>,
      footer: info => info.column.id
    }),

  ], [taskColumnHelper])


  const taskTable =
    useReactTable({
      data: taskList,
      columns : taskColumns,
      getCoreRowModel: getCoreRowModel(),
      enableMultiRowSelection: true,
      manualFiltering: true,
      getFilteredRowModel: getFilteredRowModel(),
    });

  const changeStatus = (task : Task, newStatus : "On Progress" | "Finished" | "Expired") => {
    task.task_status = newStatus;
    props.onAddTask(task, "update");
  }

  const deleteTask = (task : Task) => {
    props.onAddTask(task, "delete");
  }

  const deleteSelectedTask = () => {
    // taskTable.getSelectedRowModel().rows.forEach(row => console.log(row.original));
    const selectedTasks : Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    props.onAddTask(selectedTasks, "delete");
    taskTable.toggleAllRowsSelected(false);
    // console.log(selectedTasks);
  }

  const debugPrint = () => {
    const selectedTasks : Task[] = taskTable.getSelectedRowModel().rows.map(row => row.original);
    console.log(selectedTasks);
  }

  return (
    <>
      <TextField.Root placeholder="Search a task…" size="3" value={filterWord} onChange={event => {setFilterWord(event.target.value)}}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot pr="3">
          <IconButton size="2" variant="ghost">
            <DotsHorizontalIcon height="16" width="16" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>

      <Flex gap={"2"} justify={"start"} my={"2"}>
        <PopOverButton buttonInner={<><PlusIcon/> Add a task</>}>
          <AddTaskBody onAddTask={props.onAddTask}/>
        </PopOverButton>
        <Button disabled={!taskTable.getIsSomeRowsSelected() && !taskTable.getIsAllRowsSelected()} onClick={() => {deleteSelectedTask()}}>
          Delete selected tasks
        </Button>
        <Button disabled={!taskTable.getIsSomeRowsSelected() && !taskTable.getIsAllRowsSelected()} onClick={() => {debugPrint()}} color={"green"}>
          Mark all selected tasks as done
        </Button>
      </Flex>

      <Table.Root>
        <Table.Header>
          {taskTable.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
              <Table.ColumnHeaderCell>
                <Checkbox size={"3"}
                          checked={taskTable.getIsAllRowsSelected()}
                          onClick={taskTable.getToggleAllRowsSelectedHandler()}
                />
              </Table.ColumnHeaderCell>
              {headerGroup.headers.map(header => (
                <Table.ColumnHeaderCell key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
        {taskTable.getRowModel().rows.map(row => (
          <ContextMenu.Root key={row.id}>
            <ContextMenu.Trigger>
              <Table.Row key={row.id}>
                <Table.Cell>
                  <Checkbox size={"3"}
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onClick={row.getToggleSelectedHandler()}
                  />
                </Table.Cell>
                {row.getVisibleCells().map(cell => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            </ContextMenu.Trigger>

            <ContextMenu.Content>
              <ContextMenu.Item>See info</ContextMenu.Item>
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>Mark as</ContextMenu.SubTrigger>
                <ContextMenu.SubContent>
                  {row.original.task_status !== "On Progress" ? <ContextMenu.Item onClick={() => changeStatus(row.original, "On Progress")}>On Progress</ContextMenu.Item> : <></>}
                  {row.original.task_status !== "Expired" ? <ContextMenu.Item onClick={() => changeStatus(row.original, "Expired")}>Expired</ContextMenu.Item> : <></>}
                  {row.original.task_status !== "Finished" ? <ContextMenu.Item onClick={() => changeStatus(row.original, "Finished")}>Finished</ContextMenu.Item> : <></>}
                </ContextMenu.SubContent>
              </ContextMenu.Sub>

              {/*<DialogOpen innerElement={<ContextMenu.Item>Delete</ContextMenu.Item>} title={"Edit task"}>*/}
              {/*  <AddTaskBody onAddTask={props.onAddTask}/>*/}
              {/*</DialogOpen>*/}
              <ContextMenu.Item onClick={() => {deleteTask(row.original)}}>
                Delete
              </ContextMenu.Item>
              <ContextMenu.Item onClick={() => {props.onAddTask(row.original, "archive")}}>
                Move to Archived
              </ContextMenu.Item>

            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default TaskTable;
