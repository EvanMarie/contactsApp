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
      shadow="2xl"
      p={3}
      rounded="xl"
    >
      <VStack w="100%">{children}</VStack>
    </Card>
  );
}
