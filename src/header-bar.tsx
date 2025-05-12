import {Flex, Button, TabNav} from "@radix-ui/themes";
import {Outlet} from "react-router-dom";
import '@/index.css'
import {useState} from "react";

function HeaderBar() {
  const [page] = useState(window.location.pathname);

  return (<>
    <Flex direction={"row"} m={"2"} justify={"between"}>
      <Flex justify={"end"} gap={"2"} direction={"row"}>
        <TabNav.Root>
          <TabNav.Link href="/" active={page === "/"} >Home</TabNav.Link>
          <TabNav.Link href="/archived" active={page === "/archived"}>Archived</TabNav.Link>
          <TabNav.Link href="/random" active={page === "/random"}>Random Stuff</TabNav.Link>
        </TabNav.Root>

      </Flex>

      <Flex justify={"end"} gap={"2"} direction={"row"}>
        <Button onClick={() => {localStorage.clear(); window.location.reload();}}>Clear Data</Button>
        <Button>Do something</Button>
      </Flex>
    </Flex>
    <Outlet/>
  </>);
}

export default HeaderBar
