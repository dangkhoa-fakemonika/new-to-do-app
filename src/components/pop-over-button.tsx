import {Popover} from "radix-ui";
import {type ReactNode} from "react";;

interface PopOverButtonProps{
  trigger : ReactNode,
  children: ReactNode,
}

function PopOverButton(props : PopOverButtonProps) : ReactNode {

  return(
    <Popover.Root>
      <Popover.Trigger>
          {props.trigger}
      </Popover.Trigger>
      <Popover.Content className={"flex flex-row p-2 bg-white rounded shadow-sm border-2 z-50"} align={"start"}>
        {props.children}
      </Popover.Content>
    </Popover.Root>
  )
}

export default PopOverButton
