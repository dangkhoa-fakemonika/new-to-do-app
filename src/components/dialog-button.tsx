import {Dialog} from "radix-ui";
import type {Dispatch, ReactNode, SetStateAction} from "react";

interface DialogButtonProps{
  children: ReactNode,
  title?: ReactNode,
  description?: ReactNode,
  trigger: ReactNode,
  open: boolean,
  setOnOpen: Dispatch<SetStateAction<boolean>>
}

function DialogButton(props: DialogButtonProps){
  return (
      <Dialog.Root open={props.open} onOpenChange={props.setOnOpen}>
        <Dialog.Trigger>
          {props.trigger}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={"fixed inset-0 bg-black opacity-50"}/>
          <Dialog.Content className={"fixed top-1/10 left-1/10 translate-0.5 bg-white rounded-lg border border-gray-200 shadow px-3 py-2 w-[80%] m-auto"}>
            <Dialog.Title className={""}>{props.title}</Dialog.Title>
            <Dialog.Description className={""}>{props.description}</Dialog.Description>
            {props.children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}

export default DialogButton
