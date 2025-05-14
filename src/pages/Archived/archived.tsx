import ArchivedTable from "@/pages/Archived/ArchivedComponents/archived-table.tsx";
import {useState} from "react";
import {Spinner} from "@radix-ui/themes";

function ArchivedTasks(){
  const [isLoading, setIsLoading] = useState<boolean>(true);

  new Promise(r => setTimeout(r, 2000)).then(() => {setIsLoading(false)});

  return (
    <>
      {isLoading ?
        <div className={"flex flex-row gap-2 m-auto w-full h-full text-center items-center justify-center"}>
          Loading data, please wait <Spinner/>
        </div> :
        <ArchivedTable/>
      }
    </>
  )
}

export default ArchivedTasks;
