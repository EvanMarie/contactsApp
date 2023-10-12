// import "./styles.css";
import { useState, useEffect } from "react"; // Import useEffect here
import WidgetCard from "./widgetCard";
import { Image, Text, VStack } from "@chakra-ui/react";

export default function DadJokes() {
  const apiRoute = "https://icanhazdadjoke.com/";
  const [data, setData] = useState({ joke: "...loading" });

  async function fetchJoke() {
    setData({ joke: "...loading" });
    try {
      const result = await fetch(apiRoute, {
        headers: { Accept: "application/json" },
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await result.json();
      setData(data.status === 200 ? data : { joke: "No Joke available" });
    } catch (error) {
      console.error("fetchJoke failed", error);
      setData({ joke: "No Joke available" });
    }
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <WidgetCard
      bg="gray.600"
      cardHeight="fit-content"
      title="You can haz dad joke..."
      onClick={fetchJoke} // Fetch a new joke when the card is clicked
    >
      <VStack w="100%">
        <Text fontSize="xl">{data.joke.split("? ").join("?\n\n~ ")}</Text>{" "}
        <Image src="/dadJoke.png" alt="Dad Joke" h="150px" objectFit="cover" />
      </VStack>
    </WidgetCard>
  );
}
