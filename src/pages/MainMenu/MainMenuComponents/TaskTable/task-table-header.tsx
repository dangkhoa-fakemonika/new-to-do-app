import {TextAlignJustifyIcon, TextAlignTopIcon, TextAlignBottomIcon} from "@radix-ui/react-icons";
import type {ReactNode} from "react";

interface TaskTableHeaderProps{
  children: ReactNode,
  state: string,
  onClick: () => void,
}

function TaskTableHeader(props : TaskTableHeaderProps) : ReactNode {
  return (
    <div className={"flex flex-row items-center justify-between pe-4 ps-1"}>
      {props.children}
      <button onClick={props.onClick}>{
        props.state === "none" ? <TextAlignJustifyIcon/> :
          props.state === "asc" ? <TextAlignTopIcon/> :
            props.state === "desc" ? <TextAlignBottomIcon/> : <></>
      }
      </button>
    </div>
  );
}

export default TaskTableHeader
