// import "./styles.css";
import { useState } from "react";
import axios from "axios";
import WidgetCard from "./widgetCard";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ButtonStyles } from "~/style/myStyles";

export default function DadJokes() {
  const apiRoute = "https://icanhazdadjoke.com/";
  const [data, setData] = useState({ joke: "Want to hear a Dad Joke?" });

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
    <WidgetCard bg="cyan.700" cardHeight="fit-content">
      <VStack w="100%">
        <HStack w="100%" justify="space-between">
          {" "}
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            Here, haz dad joke...
          </Text>
          <Button
            {...ButtonStyles}
            minW="40px"
            px={0}
            onClick={() => fetchJoke()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="25px"
              height="25px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Button>
        </HStack>
        <Text fontSize="xl">{data.joke.split("? ").join("?\n\n~ ")}</Text>{" "}
      </VStack>
    </WidgetCard>
  );
}
