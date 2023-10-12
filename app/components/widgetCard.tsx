import { Card, VStack } from "@chakra-ui/react";

interface WidgetCardProps {
  children: React.ReactNode;
  image?: string;
  bg?: string;
  color?: string;
  cardWidth?: string;
  cardHeight?: string;
}

export default function WidgetCard({
  children,

  bg = "purple.900",
  color = "gray.100",
  cardWidth = "380px",
  cardHeight = "400px",
}: WidgetCardProps) {
  return (
    <Card
      w={cardWidth}
      h={cardHeight}
      color={color}
      bg={bg}
      shadow="2px 2px 5px rgba(0,0,0,0.7)"
      p={3}
      pt={2}
      sx={{
        breakInside: "avoid",
        WebkitColumnBreakInside: "avoid",
      }}
      rounded="xl"
    >
      <VStack w="100%">{children}</VStack>
    </Card>
  );
}
