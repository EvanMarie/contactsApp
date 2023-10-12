// import "./styles.css";
import { useState } from "react";
import axios from "axios";
import WidgetCard from "./widgetCard";
import { HStack, Text, VStack } from "@chakra-ui/react";
import RepeatButton from "./repeatButton";

export default function DadJokes() {
  const apiRoute = "https://icanhazdadjoke.com/";
  const [data, setData] = useState({ joke: "Click for a dad joke!" });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function axiosJoke() {
    setData({ joke: "...loading" });
    const result = await axios.get(apiRoute, {
      headers: { Accept: "application/json" },
    });
    console.log(result);
    setData(
      result.data.status === 200 ? result.data : { joke: "No Joke available" }
    );
  }

  async function fetchJoke() {
    setData({ joke: "...loading" });
    const result = await fetch(apiRoute, {
      headers: { Accept: "application/json" },
    });
    console.log(result);
    if (!result.ok) {
      throw new Error("Result OK");
    }
    const data = await result.json();
    console.log(data);
    setData(data.status === 200 ? data : { joke: "No Joke available" });
  }

  return (
    <WidgetCard bg="cyan.600" cardHeight="fit-content">
      <VStack w="100%">
        <HStack w="100%" justify="space-between">
          {" "}
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            You can haz dad joke...
          </Text>
          <RepeatButton onClick={fetchJoke} />
        </HStack>
        <Text fontSize="xl">{data.joke.split("? ").join("?\n\n~ ")}</Text>{" "}
      </VStack>
    </WidgetCard>
  );
}
