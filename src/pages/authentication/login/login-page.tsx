import {useForm, type SubmitHandler} from "react-hook-form";
import {type User} from "@/classes/User-class.ts";
import AuthenticationClass from "@/services/authentication.ts";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {PersonIcon, LockClosedIcon, EyeOpenIcon, EyeClosedIcon, DotFilledIcon, CheckIcon, Cross2Icon} from "@radix-ui/react-icons"

function LoginPage(){
  const authenticator = new AuthenticationClass();
  const [usernameError, setUsernameError] = useState<string[] | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string[] | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState : {errors},
  } = useForm<User>();

  const onSubmit : SubmitHandler<User> = async (data) => {
    setLoginError("");
    setIsLogging(true);

    const response = await authenticator.login(data.username, data.password);

    if (response.status === 400 && response.data && response.data.message === "FAILED VALIDATION") {
      setUsernameError(response.data.error.username?.errors);
      setPasswordError(response.data.error.password?.errors);
    }
    else if (response.status !== 200) {
      // console.error(response);
      setLoginError("Incorrect credentials. Try again later.");
    }
    else {
      setIsLogging(false);
      navigate("/me");
      reset();
    }

  }

  return (
    <div className={"lg:absolute lg:min-w-screen w-full flex items-center p-4 lg:p-0 min-h-screen overflow-y-hidden justify-center bg-gray-200"}>
      <div className={"lg:absolute flex flex-col rounded-lg border items-center justify-between h-fit lg:w-1/3 w-full px-4 py-6 gap-8 bg-white shadow"}>
        <div className={"w-full flex flex-col items-center justify-between gap-8"}>
          <div className={"text-2xl font-bold"}>Login in ToDoApp</div>
          <form className={"w-full"} onSubmit={handleSubmit(onSubmit)} id={"login-form"}>
            <div className={"flex flex-col w-full gap-2"}>
              <div className={"flex flex-row gap-2"}>
                <label className={"flex flex-row gap-0.5"}>Username <div className={"text-red-600"}>*</div></label>
                {(errors.username || usernameError) && <div className={"text-red-500"}>Not really a username</div>}
                {/*{usernameError && <div className={"text-red-500"}>{usernameError.join(",")}</div>}*/}
              </div>
              <div className={"flex flex-row border border-blue-400 rounded p-2 align-middle items-center gap-2"}>
                <PersonIcon/>
                <input type={"text"} {...register("username", {required: true})} placeholder={"david123"}
                       className={"w-full form-input border-transparent focus:border-transparent focus:ring-0 'focus:border-none focus:outline-none"}/>
              </div>
              <div className={"flex flex-row gap-2"}>
                <label className={"flex flex-row gap-0.5"}>Password <div className={"text-red-600"}>*</div></label>
                {errors.password && <div className={"text-red-500"}>Can't really log in without a password</div>}
              </div>
              <div className={"flex flex-row border border-blue-400 rounded p-2 align-middle items-center justify-between gap-2"}>
                <LockClosedIcon/>
                <input type={showPassword ? "text" : "password"} {...register("password", {required: true})} placeholder={"Don't really have an example for this"}
                       className={"w-full form-input border-transparent focus:border-transparent focus:ring-0 'focus:border-none focus:outline-none"}/>
                <button type={"button"} onClick={() => {setShowPassword(prevState => !prevState)}}>
                  {showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                </button>
              </div>
              <div className={"text-red-500"}>
                {loginError}
              </div>
              <div className={""}>
                The password needs to:
                {passwordError ?
                  <ul className={"*:flex *:flex-row *:gap-0.5 *:items-center"}>
                    <li className={(passwordError.includes("min_length") || passwordError.includes("max_length")) ? "text-red-600" : "text-green-500"} >{(passwordError.includes("min_length") || passwordError.includes("max_length")) ? <Cross2Icon/> : <CheckIcon/> }Be 4-20 characters long</li>
                    <li className={passwordError.includes("no_numbers") ? "text-red-600" : "text-green-500"} >{passwordError.includes("no_numbers") ? <Cross2Icon/> : <CheckIcon />}Has one number</li>
                    <li className={passwordError.includes("no_lowercase") ? "text-red-600" : "text-green-500"} >{passwordError.includes("no_lowercase") ? <Cross2Icon/> : <CheckIcon/> }Has a lowercase character</li>
                    <li className={passwordError.includes("no_uppercase") ? "text-red-600" : "text-green-500"} >{passwordError.includes("no_uppercase") ? <Cross2Icon/> : <CheckIcon />}Has a uppercase character</li>
                    <li className={passwordError.includes("no_special_characters") ? "text-red-600" : "text-green-500"} >{passwordError.includes("no_special_characters") ? <Cross2Icon/> : <CheckIcon/> }Has a special character : #?!@$%^&*-</li>
                  </ul>
                  :
                  <ul className={"*:flex *:flex-row *:gap-0.5 *:items-center"}>
                    <li><DotFilledIcon/> Be 4-20 characters long</li>
                    <li><DotFilledIcon/> Has one number</li>
                    <li><DotFilledIcon/> Has a lowercase character</li>
                    <li><DotFilledIcon/> Has a uppercase character</li>
                    <li><DotFilledIcon/> Has a special character : #?!@$%^&*-</li>
                  </ul>
                }
              </div>
            </div>
          </form>
        </div>

        <div className={"flex flex-row w-full justify-end gap-3"}>
          <Link className={"rounded-lg bg-red-400 hover:bg-red-500 active:bg-red-400 disable:bg-red-300 font-medium text-white shadow-xl py-2 px-4"} to={"/"}>
            Back
          </Link>
          <button type={"submit"} form={"login-form"} disabled={isLogging}
                  className={"rounded-lg bg-blue-400 font-medium text-white shadow-xl hover:bg-blue-500 hover:cursor-pointer active:bg-blue-400 disabled:bg-blue-300 py-2 px-4"}>
            Log In
          </button>
          <button className={"hidden"} onClick={async () => {
            await authenticator.refresh()
          }}>
          Refresh Token
          </button>
        </div>

      </div>
    </div>
  )
}

export default LoginPage;
