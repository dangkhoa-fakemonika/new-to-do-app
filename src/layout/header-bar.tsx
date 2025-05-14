import {Outlet} from "react-router-dom";
import '@/index.css'
import {useState} from "react";

function HeaderBar() {
  const [page] = useState(window.location.pathname);

  const pages = [
    {
      path : "/",
      name : "Home",
    },
    {
      path : "/archived",
      name : "Archived",
    },
    {
      path : "/random",
      name : "Random Stuff",
    },
  ]

  return (<>
    <div className={"flex flex-row my-2 justify-between py-2 border-b-2"}>
      <div className={"flex flex-row gap-2 justify-end"}>
        <nav className={"flex flex-row justify-between"}>
        {pages.map(pageInfo => (
          <a key={pageInfo.path} className={`inline-block text-center content-center p-4 font-medium h-fit text-[0.9em] ${page === pageInfo.path ? "bg-blue-400 text-white" : "hover:bg-blue-50 bg-white text-black"}`} href={pageInfo.path}>{pageInfo.name}</a>
        ))}
        </nav>
      </div>

      <div className={"flex flex-row justify-end gap-2"}>
        <button className={"rounded-lg font-medium bg-red-600 text-white p-2 text-[0.9em]"} onClick={() => {localStorage.clear(); window.location.reload();}}>Clear Data</button>
        <button className={"rounded-lg font-medium bg-purple-600 text-white p-2 text-[0.9em]"}>Do something</button>
      </div>
    </div>
    <Outlet/>
  </>);
}

export default HeaderBar
