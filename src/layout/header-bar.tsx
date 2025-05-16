import {type ReactNode, useState} from "react";
import PopOverButton from "@/components/pop-over-button.tsx";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import {Link} from "react-router-dom";
// import { useNavigate, Link } from "react-router";

function HeaderBar(): ReactNode {
  const [page] = useState(window.location.pathname);
  // const navigate = useNavigate();

  const pages = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/archived",
      name: "Archived",
    },
    {
      path: "/random",
      name: "Random Stuff",
    },
  ]

  return (
      <div className={"flex flex-row my-2 justify-between py-2 border-b-2"}>
        <div className={"flex flex-row gap-2 justify-end"}>
          <nav className={"flex flex-row justify-between"}>
            {pages.map(pageInfo => (
              <Link key={pageInfo.path}
                 className={`inline-block text-center content-center p-4 font-medium h-fit text-[0.9em] ${page === pageInfo.path ? "bg-blue-400 text-white" : "hover:bg-blue-50 bg-white text-black"}`}
                   to={pageInfo.path} >{pageInfo.name}</Link>
            ))}
          </nav>
        </div>

        <div className={"flex flex-row justify-end gap-2"}>
          <PopOverButton trigger={<DotsVerticalIcon scale={3}/>}>
            <div className={"flex flex-col gap-2"}>
              <button className={"rounded-lg font-medium bg-red-600 text-white p-2 text-[0.9em]"} onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}>Clear Data
              </button>
              <button className={"rounded-lg font-medium bg-purple-600 text-white p-2 text-[0.9em]"}>Do something</button>
            </div>
          </PopOverButton>
        </div>
      </div>);
}

export default HeaderBar
