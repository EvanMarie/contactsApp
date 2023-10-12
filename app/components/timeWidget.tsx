import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function TimeWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Text
      fontSize="3xl"
      color="purple.200"
      fontWeight="bold"
      lineHeight="30px"
      fontFamily="Inconsolata"
    >
      {time.toLocaleTimeString()}
    </Text>
  );
}
