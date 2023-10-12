import { Badge, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function TimeWidget() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatDateAndTime = (date: Date) => {
    // Options for date and time
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    // Create date and time strings
    const dateString = date.toLocaleDateString(undefined, dateOptions);
    const timeString = date.toLocaleTimeString(undefined, timeOptions);

    // Return the combined string with "@" symbol
    return `${dateString} @ ${timeString}`; // Here you control the separator between date and time
  };

  return (
    <Badge color="cyan.300" bg="transparent" textShadow="1px 1px 2px black">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        lineHeight="30px"
        fontFamily="Inconsolata"
      >
        {formatDateAndTime(dateTime)}
      </Text>
    </Badge>
  );
}
