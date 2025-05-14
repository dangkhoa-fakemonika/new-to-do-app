import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import type {Task} from "@/classes/Task-class.ts";

function ArchivedTable() {
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

  const archivedTable =
    useReactTable({
      data: archivedData,
      columns : taskColumns,
      getCoreRowModel: getCoreRowModel(),
    });

  return (<>
    <table className={"w-2/3 mx-auto content-center"}>
      <thead className={""}>
      {archivedTable.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id} className={"border border-gray-400 *:py-2"}>
          {headerGroup.headers.map(header => (
            <th key={header.id}>
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
      </thead>

      <tbody className={"w-full"}>
      {archivedTable.getRowModel().rows.map(row => (
        <tr key={row.id} className={"*:py-2 *:border-b hover:rounded hover:bg-gray-100"}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {
                <div className={"w-full"}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              }
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  </>)
}

export default ArchivedTable
