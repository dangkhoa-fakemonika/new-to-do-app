import {IconButton, TextField} from "@radix-ui/themes";
import {DotsHorizontalIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useState} from "react";

function SearchTextView() {

  const [textField, setTextField] = useState("");

  return (
    <TextField.Root placeholder="Search a task…" size="3" value={textField} onChange={event => {setTextField(event.target.value)}}>
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Slot pr="3">
        <IconButton size="2" variant="ghost">
          <DotsHorizontalIcon height="16" width="16" />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>

  )
}

export default SearchTextView
