import axios from "axios";
import {useState} from "react";
import {Button, Flex, Text, Spinner, Separator, Callout, AspectRatio, Container} from "@radix-ui/themes";
import {InfoCircledIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";

function RandomStuff(){
  const [catQuotes, setCatQuotes] = useState("Press the button to generate a cat fact");
  const [jokesSetup, setJokesSetup] = useState("Press the button to generate a joke");
  const [jokeDeliver, setJokeDeliver] = useState("The response will be shown here");
  const [dogUrl, setDogUrl] = useState("");
  const [isGeneratingCat, setCatGenerating] = useState(false);
  const [isGeneratingJoke, setJokeGenerating] = useState(false);

  const generateCatQuotes = () => {
    setCatGenerating(true);
    axios.get('https://catfact.ninja/fact').then((response) => {
      console.log(response);
      setCatQuotes(response.data.fact);
    }).catch((error) =>{
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
    }).catch((error) =>{
      console.error(error);
    }).finally(() => {
      setJokeGenerating(false);
    })
  }

  const generateDogImage = () => {
    axios.get('https://dog.ceo/api/breeds/image/random').then((response) => {
      console.log(response);
      setDogUrl(response.data.message);
    }).catch((error) =>{
      console.error(error);
    }).finally(() => {
    })
  }

  return (
      <Flex direction={"column"} gap={"2"}>
        <Button onClick={generateCatQuotes} disabled={isGeneratingCat}>{ !isGeneratingCat ? <Text>Generate a cat related fact</Text> : <Spinner/> }</Button>
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {catQuotes}
          </Callout.Text>
        </Callout.Root>
        <Separator size={"4"}/>

        <Button onClick={generateJoke} disabled={isGeneratingJoke}>{ !isGeneratingJoke ? <Text>Generate a joke</Text> : <Spinner/> }</Button>
        <Callout.Root color={"yellow"}>
          <Callout.Icon>
            <QuestionMarkCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {jokesSetup}
          </Callout.Text>
        </Callout.Root>
        <Callout.Root color={"green"}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {jokeDeliver}
          </Callout.Text>
        </Callout.Root>
        <Separator size={"4"}/>

        <Button onClick={generateDogImage}>Generate a dog image</Button>
        <Container size={"1"} align={"center"} >
          <AspectRatio ratio={1}>
            <img
              src={dogUrl}
              alt="Dog"
              style={{
                objectFit: "cover",
                borderRadius: "var(--radius-2)",
              }}
            />
          </AspectRatio>
        </Container>


      </Flex>
    );
}

export default RandomStuff;
