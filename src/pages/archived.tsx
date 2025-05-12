import {Table} from "@radix-ui/themes";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import type {Task} from "@/data_classes/Task-class.ts";

function ArchivedTasks(){
  let archivedData;
  const archivedStorageName = "archived_data";

  const getData = localStorage.getItem(archivedStorageName);
  if (getData == null){
    localStorage.setItem(archivedStorageName, JSON.stringify([]))
    archivedData = [];
  }
  else {
    archivedData =  JSON.parse(getData);
  }

  const taskColumnHelper = createColumnHelper<Task>();

  const taskColumns = [
    taskColumnHelper.accessor('task_id', {
      header: () => "ID",
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),

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
  ];

  const taskTable =
    useReactTable({
      data: archivedData,
      columns : taskColumns,
      getCoreRowModel: getCoreRowModel(),
    });

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
              <Table.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export default ArchivedTasks;
