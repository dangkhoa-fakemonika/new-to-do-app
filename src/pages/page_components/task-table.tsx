import {Table, Badge, Checkbox, Button, ContextMenu} from "@radix-ui/themes"
import {useTaskManagerContext} from "@/context.ts";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import type {Task} from "@/data_classes/Task-class.ts";

function TaskTable() {

  const taskList = useTaskManagerContext();

  const taskColumnHelper = createColumnHelper<Task>();

  const taskColumns = [
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

  ]

  const taskTable = useReactTable({
    data: taskList,
    columns : taskColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <Table.Root>
        <Table.Header>
          {taskTable.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
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
                {row.getVisibleCells().map(cell => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            </ContextMenu.Trigger>

            <ContextMenu.Content>

            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default TaskTable;
