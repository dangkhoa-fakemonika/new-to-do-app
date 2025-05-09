import { Dialog } from "@radix-ui/themes";
import {Button} from "@radix-ui/themes";
import '@/index.css'

function DialogOpenText(props) {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={() => console.log("hi")}>
          Sample
        </Button>
      </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
            {props.children}
          <Dialog.Close>
            <Button>
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>

    </Dialog.Root>)
}

export default DialogOpenText
