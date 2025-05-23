import {useEffect, useState} from "react";
import AuthenticationClass from "@/services/authentication.ts";
import {EnterIcon, ExitIcon, ReloadIcon, TokensIcon} from "@radix-ui/react-icons";
import {Link} from "react-router-dom";
import DialogButton from "@/components/dialog-button.tsx";
import {useNavigate} from "react-router-dom";

function MyProfile() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState();
  const [errorType, setErrorType] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const auth = new AuthenticationClass();
    auth.getUserData().then((response) => {
      if (response.status === 400) {
        if (response.data.message === "EMPTY KEY") {
          setErrorType("You need to login to view your profile.");
        } else if (response.data.message === "REFRESH TOKEN EXPIRED") {
          setErrorType("Session expired, please login again.");
        } else {
          setErrorType("Unknown error, please return to login.");
        }
      } else if (response.status !== 200) {
        setErrorType("Can't load data from database");
      } else {
        setUserData(response.data);
      }

      new Promise(r => setTimeout(r, 1000)).then(() => {
        setLoading(false);
      });
    })
  }, [])

  return (
    <div className={"flex lg:items-center justify-center"}>
      {
        loading ?
          <div className={"h-full justify-center py-16 items-center flex flex-row"}>
            <div className={"font-bold text-2xl flex flex-row items-center gap-2 justify-center"}>
              <ReloadIcon className={"animate-spin"} scale={"20px"}/> Loading data...
            </div>
          </div>
          : userData ?
            <div className={"flex flex-col lg:flex-row gap-8 w-full lg:w-2/3 *:*:shadow-xl my-8 p-4"}>

              <div className={"flex flex-col gap-4 w-full lg:w-fit h-fit items-center"}>
                <div className={"flex flex-col bg-white w-full items-center h-fit p-4 rounded-lg gap-2"}>
                  <img src={userData["image"]} alt={userData["firstName"] + " " + userData["lastName"]}
                       className={"max-w-fit"}/>
                  <div>{userData["firstName"] + " " + userData["lastName"]}</div>
                  <div>{userData["email"]}</div>
                  <div>{userData["phone"]}</div>
                </div>
                <DialogButton trigger={
                  <div
                    className={"flex flex-row bg-red-400 text-white p-2 rounded w-full justify-center lg:w-fit items-center gap-2 hover:bg-red-500 hover:cursor-pointer active:bg-red-400 active:shadow active:mt-0.5"}>
                    Log out <ExitIcon/>
                  </div>
                } open={dialogOpen} setOnOpen={setDialogOpen} title={
                  <div className={"text-xl font-bold"}>
                    {loggingOut ? "Logging out..." : "Log out?"}
                  </div>
                }>
                  <div className={"flex flex-row justify-end *:shadow-xl gap-2 lg:w-fit"}>
                    <button onClick={() => {setDialogOpen(false)}} disabled={loggingOut}
                      className={"flex flex-row bg-red-400 text-white p-2 rounded w-full justify-center lg:w-fit items-center gap-2 hover:bg-red-500 hover:cursor-pointer active:bg-red-400 active:shadow disabled:bg-red-300"}>
                      No, I'm not done
                    </button>
                    <button onClick={async () => {
                      setLoggingOut(true);
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("refresh_token");

                      new Promise(r => setTimeout(r, 2000)).then(() => {
                        setDialogOpen(false);
                        setLoggingOut(false);
                        navigate("/login");
                      });

                    }} disabled={loggingOut}
                      className={"flex flex-row bg-blue-400 text-white p-2 rounded w-full justify-center lg:w-fit items-center gap-2 hover:bg-blue-500 hover:cursor-pointer active:bg-blue-400 active:shadow disabled:bg-blue-300"}>
                      Yes, log me out
                    </button>
                  </div>
                </DialogButton>
              </div>

              <div className={"flex flex-col lg:w-full gap-4 *:grid *:grid-cols-2 *:bg-white *:rounded-lg *:p-4 *:gap-2"}>
                <div>
                  <div className={"font-bold text-xl"}>
                    Personal Information
                  </div>
                  <div/>
                  <div>Age</div>
                  <div>{userData["age"]}</div>
                  <hr className={"col-span-2"}/>
                  <div>Gender</div>
                  <div>{userData["gender"]}</div>
                  <hr className={"col-span-2"}/>
                  <div>Birthdate</div>
                  <div>{userData["birthDate"]}</div>
                  <hr className={"col-span-2"}/>
                  <div>Address</div>
                  <div>{userData["address"]["address"]}, {userData["address"]["city"]}</div>
                </div>

                <div>
                  <div className={"font-bold text-xl"}>
                    Physical Description
                  </div>
                  <div/>
                  <div>Height</div>
                  <div>{userData["height"]}</div>
                  <hr className={"col-span-2"}/>
                  <div>Weight</div>
                  <div>{userData["weight"]}</div>
                  <hr className={"col-span-2"}/>
                  <div>Eye Color</div>
                  <div>{userData["eyeColor"]}</div>
                  <hr className={"col-span-2"}/>
                  <div>Hair Style</div>
                  <div>{userData["hair"]["type"]}, {userData["hair"]["color"]}</div>
                </div>
              </div>
            </div>
            :
            <div className={"absolute flex flex-col justify-center items-center w-full lg:w-1/2 bg-white rounded shadow-xl gap-4 p-4"}>
              <div className={"font-bold text-xl"}>{errorType}</div>
              <div className={"flex flew-row gap-2"}>
                <Link to={"/login"}
                  className={"flex flex-row bg-blue-400 text-white p-2 rounded w-full justify-center lg:w-fit items-center gap-2 hover:bg-blue-500 active:bg-blue-400 active:shadow active:mt-0.5"}>
                  Go to Login <EnterIcon/>
                </Link>
                <Link to={"/"}
                      className={"flex flex-row bg-blue-400 text-white p-2 rounded w-full justify-center lg:w-fit items-center gap-2 hover:bg-blue-500 active:bg-blue-400 active:shadow active:mt-0.5"}>
                  Back to Dashboard <TokensIcon/>
                </Link>
              </div>
            </div>
      }
    </div>
  )


}

export default MyProfile
