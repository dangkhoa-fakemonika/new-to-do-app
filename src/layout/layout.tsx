import HeaderBar from "@/layout/header-bar.tsx";
import FooterBar from "@/layout/footer-bar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useLayoutEffect, useState} from "react";
import AuthenticationClass from "@/services/authentication.ts";
import {ReloadIcon} from "@radix-ui/react-icons";

function Layout() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setLoading(true);
    const auth = new AuthenticationClass();
    auth.getUserData().then(async (response) => {
      await new Promise(r => setTimeout(r, 1000));
      if (response.status !== 200)
        navigate("/login");
      setLoading(false);
    })
  }, [navigate])

  return (
    loading ?
      <div className={"absolute min-w-screen min-h-screen flex lg:items-center justify-center bg-gray-200"}>
        <div className={"absolute h-full items-center flex flex-row"}>
          <div className={"font-bold text-2xl flex flex-row items-center gap-2 justify-center"}>
            <ReloadIcon className={"animate-spin"} scale={"20px"}/> Getting user session...
          </div>
        </div>
      </div>
      :
    <div className={"flex flex-col justify-between px-6 py-2"}>
      <div className={"flex flex-col"}>
        <HeaderBar/>
        <Outlet/>
      </div>
      <FooterBar/>
    </div>
  )
}

export default Layout
