import { Box } from "@chakra-ui/react";
import DadJokes from "./dadJokes";
import UncleIrohQuotes from "./uncleIroh";

export default function Welcome() {
  return (
    <Box
      padding={4}
      w="100%"
      mx="auto"
      overflowWrap="break-word"
      sx={{ columnCount: [1, 1, 2, 2, 3, 3], columnGap: "8px" }}
    >
      <UncleIrohQuotes />
      <DadJokes />
    </Box>
  );
}
