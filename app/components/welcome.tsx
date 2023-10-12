import { Box } from "@chakra-ui/react";
import DadJokes from "./dadJokes";
import WisdomQuotes from "./wisdom";
import PhotoAlbum from "./photoAlbum";
import Weather from "./weather";
import TodoList from "./todo";

export default function Welcome() {
  return (
    <Box
      padding={4}
      mx="auto"
      overflowWrap="break-word"
      sx={{ columnCount: [1, 1, 2, 2, 3, 3], columnGap: "25px" }}
    >
      <TodoList />
      <WisdomQuotes />
      <PhotoAlbum /> <DadJokes />
      <Weather />
    </Box>
  );
}
