import axios from "axios";
import {useState} from "react";
import {Spinner} from "@radix-ui/themes";
import {InfoCircledIcon} from "@radix-ui/react-icons";

function RandomStuff() {
  const [catQuotes, setCatQuotes] = useState("Press the button to generate a cat fact");
  const [jokesSetup, setJokesSetup] = useState("Press the button to generate a joke");
  const [jokeDeliver, setJokeDeliver] = useState("The response will be shown here");
  const [dogUrl, setDogUrl] = useState("");
  const [isGeneratingCat, setCatGenerating] = useState(false);
  const [isGeneratingJoke, setJokeGenerating] = useState(false);
  const [isGeneratingDog, setDogGenerating] = useState(false);

  const generateCatQuotes = () => {
    setCatGenerating(true);
    axios.get('https://catfact.ninja/fact').then((response) => {
      console.log(response);
      setCatQuotes(response.data.fact);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setCatGenerating(false);
    })
  }

  const generateJoke = () => {
    setJokeGenerating(true);
    axios.get('https://official-joke-api.appspot.com/random_joke').then((response) => {
      setJokesSetup(response.data.setup);
      setJokeDeliver(response.data.punchline);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setJokeGenerating(false);
    })
  }

  const generateDogImage = () => {
    setDogGenerating(true);
    axios.get('https://dog.ceo/api/breeds/image/random').then((response) => {
      console.log(response);
      setDogUrl(response.data.message);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setDogGenerating(false);
    })
  }

  return (
    <div className={"flex flex-col gap-2"}>
      <button
        className={"flex bg-blue-500 p-1 font-medium text-white rounded justify-center items-center disabled:bg-blue-300"}
        onClick={generateCatQuotes} disabled={isGeneratingCat}>{!isGeneratingCat ?
        <div>Generate a cat related fact</div> : <Spinner className={"m-0.5"} size={"3"}/>}</button>
      <div className={"flex flex-row items-center gap-2 py-3 px-4 bg-blue-100 text-blue-600 rounded-lg"}>
        <InfoCircledIcon/>
        {isGeneratingCat ? "..." : catQuotes}
      </div>

      <hr/>

      <button
        className={"flex bg-blue-500 p-1 font-medium text-white rounded justify-center items-center disabled:bg-blue-300"}
        onClick={generateJoke} disabled={isGeneratingJoke}>{!isGeneratingJoke ? <div>Generate a joke</div> :
        <Spinner className={"m-0.5"} size={"3"}/>}</button>

      <div className={"flex flex-row items-center gap-2 py-3 px-4 bg-yellow-100 text-yellow-600 rounded-lg"}>
        <InfoCircledIcon/>
        {isGeneratingJoke ? "..." : jokesSetup}
      </div>
      <div className={"flex flex-row items-center gap-2 py-3 px-4 bg-green-100 text-green-600 rounded-lg"}>
        <InfoCircledIcon/>
        {isGeneratingJoke ? "..." : jokeDeliver}
      </div>

      <hr/>

      <button
        className={"flex bg-blue-500 p-1 font-medium text-white rounded justify-center items-center disabled:bg-blue-300"}
        onClick={generateDogImage}>Generate a dog image
      </button>

      <div hidden={dogUrl.length === 0} className={"flex"}>
        <img
          src={dogUrl}
          alt=""
          className={"aspect-square w-1/6 rounded-lg border border-black z-0"}
        />
        {/*<div*/}
        {/*  className={"aspect-square w-1/6 rounded-lg border border-black z-0 bg-white bg-opacity-10 z-10"}>*/}

        {/*</div>*/}


      </div>


    </div>
  );
}

export default RandomStuff;
