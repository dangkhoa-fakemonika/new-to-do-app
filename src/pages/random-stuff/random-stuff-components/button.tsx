import type {ReactNode} from "react";

interface ButtonProps{
  children: ReactNode,
  onClick: () => void,
  disabled : boolean
}

function Button(props: ButtonProps){
  return (<button
    className={"flex bg-blue-500 p-1 font-medium text-white rounded justify-center items-center disabled:bg-blue-300"}
    onClick={props.onClick} disabled={props.disabled}>{props.children}</button>)
}

export default Button;
