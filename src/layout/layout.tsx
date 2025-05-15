import HeaderBar from "@/layout/header-bar.tsx";
import FooterBar from "@/layout/footer-bar.tsx";
import {Outlet} from "react-router-dom";

function Layout() {

  return(
    <div className={"flex flex-col justify-between"}>
      <div className={"flex flex-col"}>
        <HeaderBar/>
        <Outlet/>
      </div>
      <FooterBar/>
    </div>
  )
}

export default Layout
