import type {ReactNode} from "react";
function LoadingTaskTable(): ReactNode {
  return (
    <div className={"relative content-center cursor-wait"}>
      <table className={"w-full animate-pulse"}>
        <thead className={""}>
        <tr className={"border border-gray-400 *:py-2"}>
          <th>
            <input type={"checkbox"} disabled={true}/>
          </th>
          {Array.from(Array(4).keys()).map(header => (
            <th key={header}>
              <div className={"flex flex-row items-center justify-between pe-4"}>
                <div className={"rounded bg-gray-300 px-4 md:px-16 py-2 mx-2"}></div>
              </div>
            </th>
          ))}
        </tr>
        </thead>

        <tbody className={"w-full"}>
        {Array.from(Array(8).keys()).map(row => (
          <tr key={row} className={"*:py-2 *:border-b"}>
            <td className={"text-center"}>
              <input type={"checkbox"} disabled={true}/>
            </td>
            {Array.from(Array(4).keys()).map(cell => (
              <td key={cell}>
                {
                  <div className={"w-full"}>
                    <div className={"flex flex-row items-center justify-between pe-4"}>
                      <div className={"rounded bg-gray-300 px-4 md:px-16 py-2 mx-2"}></div>
                    </div>
                  </div>
                }
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default LoadingTaskTable;
