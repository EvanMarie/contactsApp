import { Box, HStack } from "@chakra-ui/react";
import WidgetCard from "./widgetCard";
import { scrollBarStyles } from "~/style/myStyles";

const photos = [
  "/photoAlbum/01.jpg",
  "/photoAlbum/02.jpg",
  "/photoAlbum/03.jpg",
  "/photoAlbum/04.jpg",
  "/photoAlbum/05.jpg",
  "/photoAlbum/06.jpg",
  "/photoAlbum/07.jpg",
  "/photoAlbum/08.jpg",
  "/photoAlbum/09.png",
];

export default function PhotoAlbum() {
  return (
    <WidgetCard title="Photo Album" showButton={false} cardHeight="fit-content">
      <Box w="100%" overflowY="auto" sx={scrollBarStyles}>
        <HStack w="fit-content" spacing={4}>
          {photos.map((photo, index) => (
            <Box
              key={index}
              w="275px"
              h="275px"
              bgImage={`url(${photo})`}
              bgSize="cover"
              bgPos="center"
              borderRadius="md"
              boxShadow="3px 3px 5px rgba(0,0,0,0.5)"
              mb={3}
            />
          ))}
        </HStack>
      </Box>
    </WidgetCard>
  );
}
