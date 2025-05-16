import {Popover} from "radix-ui";
import {type Dispatch, type ReactNode, type SetStateAction} from "react";

interface PopOverButtonProps{
  trigger : ReactNode,
  children: ReactNode,
  open: boolean,
  setOnOpen: Dispatch<SetStateAction<boolean>>
}

function PopOverButton(props : PopOverButtonProps) : ReactNode {
  return(
    <Popover.Root open={props.open} onOpenChange={props.setOnOpen}>
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
