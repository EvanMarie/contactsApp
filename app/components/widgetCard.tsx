import { Card, HStack, Text, VStack } from "@chakra-ui/react";
import RepeatButton from "./repeatButton";

interface WidgetCardProps {
  children: React.ReactNode;
  image?: string;
  bg?: string;
  color?: string;
  cardWidth?: string;
  cardHeight?: string;
  title?: string;
  titleColor?: string;
  showButton?: boolean;
  onClick?: () => void;
}

export default function WidgetCard({
  children,
  color = "gray.100",
  cardWidth = "380px",
  cardHeight = "400px",
  title,
  showButton = true,
  onClick = () => {},
  titleColor = "cyan.200",
}: WidgetCardProps) {
  return (
    <Card
      bgGradient="linear(to-b, gray.900, gray.700)"
      w={cardWidth}
      h={cardHeight}
      color={color}
      mb="20px"
      shadow="2px 2px 5px rgba(0,0,0,0.7)"
      sx={{
        breakInside: "avoid",
        WebkitColumnBreakInside: "avoid",
      }}
      rounded="xl"
    >
      <VStack w="100%" spacing={4}>
        <HStack
          w="100%"
          bgGradient="linear(to-b, gray.700, gray.900)"
          roundedTop="lg"
          justify="space-between"
          px={4}
          py={2}
          shadow="1px 1px 1px black"
          borderBottom="1px solid rgba(0,0,0,0.5)"
        >
          {" "}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={titleColor}
            textShadow="2px 2px 5px rgba(0,0,0,0.5)"
          >
            {title}
          </Text>
          {showButton && <RepeatButton onClick={onClick} />}
        </HStack>
        <VStack w="100%" px={4} pb={4}>
          {children}
        </VStack>
      </VStack>
    </Card>
  );
}
