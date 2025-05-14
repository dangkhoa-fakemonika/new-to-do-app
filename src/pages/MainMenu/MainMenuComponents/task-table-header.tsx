import {TextAlignJustifyIcon, TextAlignTopIcon, TextAlignBottomIcon} from "@radix-ui/react-icons";

interface TaskTableHeaderProps{
  children: any,
  state: string,
  onClick: () => void,
}

function TaskTableHeader(props : TaskTableHeaderProps){
  return (
    <div className={"flex flex-row items-center justify-between pe-4"}>
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
