import {Popover, Button} from "@radix-ui/themes";

interface PopOverButtonProps{
  buttonInner : string,
  children: never,
}

function PopOverButton(props : PopOverButtonProps) {

  return(
    <Popover.Root>
      <Popover.Trigger>
        <Button>
          {props.buttonInner}
        </Button>
      </Popover.Trigger>
      <Popover.Content width="360px">
        {props.children}
      </Popover.Content>
    </Popover.Root>
  )
}

export default PopOverButton
