import {IconButton, TextField} from "@radix-ui/themes";
import {DotsHorizontalIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";

interface SearchProps {
  onChange : (value: string) => void;
}

function SearchTextView({onChange} : SearchProps) {

  return (
    <TextField.Root placeholder="Search a task…" size="3" onChange={event => {onChange(event.target.value)}}>
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
