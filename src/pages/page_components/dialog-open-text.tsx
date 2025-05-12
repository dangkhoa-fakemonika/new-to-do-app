import { Dialog } from "@radix-ui/themes";
import {Button} from "@radix-ui/themes";
import '@/index.css'

interface DialogOpenProps {
  children: any,
  innerElement : any,
  title : string,
  description? : string,
}

function DialogOpen(props : DialogOpenProps) {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {props.innerElement}
      </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Description>{props.description}</Dialog.Description>
            {props.children}
          <Dialog.Close>
            <Button>
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>

    </Dialog.Root>)
}

export default DialogOpen
