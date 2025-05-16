import {type ReactNode, useState} from "react";
import {Spinner} from "@radix-ui/themes";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {CommonAPIsController} from "@/services/services.ts";
import Button from "@/pages/random-stuff/random-stuff-components/button.tsx";

function RandomStuff() : ReactNode {
  const [catQuotes, setCatQuotes] = useState("Press the button to generate a cat fact");
  const [jokeSetup, setJokeSetup] = useState("Press the button to generate a joke");
  const [jokeDeliver, setJokeDeliver] = useState("The response will be shown here");
  const [dogUrl, setDogUrl] = useState<string | undefined>(undefined);
  const [isGeneratingCat, setCatGenerating] = useState(false);
  const [isGeneratingJoke, setJokeGenerating] = useState(false);
  const [isGeneratingDog, setDogGenerating] = useState(false);

  const myAPI = new CommonAPIsController();

  const generateCatQuotes = async () => {
    setCatGenerating(true);
    const data = (await myAPI.fetchCatQuote()).data;
    setCatQuotes(data.fact);
    setCatGenerating(false);
  }

  const generateJoke = async () => {
    setJokeGenerating(true);
    const data = (await myAPI.fetchJoke()).data;
    setJokeSetup(data.setup);
    setJokeDeliver(data.punchline);
    setJokeGenerating(false);
  }

  const generateDogImage = async () => {
    setDogGenerating(true);
    const data = (await myAPI.fetchDogImage()).data;
    setDogUrl(data.message);
    setDogGenerating(false);
  }

  return (
    <div className={"flex flex-col gap-2 justify-center items-center *:w-full"}>
      <Button onClick={generateCatQuotes} disabled={isGeneratingCat}>
        {!isGeneratingCat ?<div>Generate a cat related fact</div> : <Spinner className={"m-0.5"} size={"3"}/>}
      </Button>
      <div className={"flex flex-row items-center gap-2 py-3 px-4 bg-blue-100 text-blue-600 rounded-lg"}>
        <InfoCircledIcon/>
        {isGeneratingCat ? "..." : catQuotes}
      </div>

      <hr/>

      <Button
        onClick={generateJoke} disabled={isGeneratingJoke}>
        {!isGeneratingJoke ? <div>Generate a joke</div> : <Spinner className={"m-0.5"} size={"3"}/>}
      </Button>

      <div className={"flex flex-row items-center gap-2 py-3 px-4 bg-yellow-100 text-yellow-600 rounded-lg"}>
        <InfoCircledIcon/>
        {isGeneratingJoke ? "..." : jokeSetup}
      </div>
      <div className={"flex flex-row items-center gap-2 py-3 px-4 bg-green-100 text-green-600 rounded-lg"}>
        <InfoCircledIcon/>
        {isGeneratingJoke ? "..." : jokeDeliver}
      </div>

      <hr/>

      <Button disabled={isGeneratingDog} onClick={generateDogImage}>
        {!isGeneratingDog ? <div>Generate a dog image</div> : <Spinner className={"m-0.5"} size={"3"}/>}
      </Button>

      <div hidden={dogUrl === undefined || dogUrl.length === 0} className={"flex aspect-square lg:w-1/6 md:w-1/2 sm:w-full rounded-lg border border-black items-center justify-center"}>
        {
          !isGeneratingDog ?
          <img
            src={dogUrl}
            alt=""
            className={"aspect-square w-full rounded-lg border border-black"}
          /> : <Spinner size={"3"}/>
        }
      </div>
    </div>
  );
}

export default RandomStuff;
