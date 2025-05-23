import {CheckIcon} from "@radix-ui/react-icons";
import {Link} from "react-router-dom";

function WelcomePage(){

  return (
    <div className={"absolute min-h-screen min-w-screen justify-center items-center flex flex-col bg-blue-400"}>
      <div className={"flex flex-col items-center justify-center text-white font-extrabold lg:text-5xl text-3xl"}>
        <div className={"text-shadow transition duration-300 ease-initial"}>
          Welcome to ToDoApp!
        </div>
        <div className={"grid grid-cols-5 p-1 m-4 box-border *:border-2 *:border-white"}>
          <div className={"rounded-tl-xl"}><CheckIcon width={"1em"} height={"1em"}/></div>
          <div className={"col-span-4 rounded-tr-xl"}></div>
          <div><CheckIcon width={"1em"} height={"1em"}/></div>
          <div className={"col-span-4"}></div>
          <div className={"rounded-bl-xl"}><CheckIcon width={"1em"} height={"1em"}/></div>
          <div className={"col-span-4 rounded-br-xl"}></div>
        </div>
      </div>

      <Link to={"/login"}
            className={"p-2 text-2xl text-white font-bold border-2 border-white shadow shadow-white rounded-xl hover:bg-blue-300 hover:cursor-pointer active:bg-white active:text-blue-400  transition ease-in duration-300"}>
        Get Started
      </Link>

    </div>
  )
}

export default WelcomePage
