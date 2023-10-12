import {
  Badge,
  Box,
  Card,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { ContactMutation } from "~/myFakeData";
import FormatDate from "~/utils/formateDate";

export function ContactMiniCard({ contact }: { contact: ContactMutation }) {
  return (
    <NavLink to={`contacts/${contact.id}`}>
      <Card
        bg="cyan.500"
        p={5}
        rounded="lg"
        w="350px"
        h="400px"
        shadow="2xl"
        border="2px solid"
        _hover={{
          bg: "purple.200",
          cursor: "pointer",
        }}
        transition="all 0.2s ease-in-out"
      >
        <VStack w="100%" spacing={3}>
          <Box position="relative">
            {contact.favorite && (
              <Badge
                position="absolute"
                top="-2"
                right="-2"
                display="flex"
                h="30px"
                py="3px"
                px="5px"
                bg="purple.400"
                color="white"
                fontSize="1rem"
                textShadow="1px 1px 3px black"
              >
                {" "}
                ★ Fave
              </Badge>
            )}
            <Image
              src={contact.avatar}
              alt={`${contact.first} ${contact.last} avatar`}
              w="250px"
              h="250px"
              objectFit="cover"
              rounded="md"
              shadow="2xl"
            />
          </Box>
          <VStack w="100%" spacing={0}>
            <HStack w="100%">
              {contact.favorite && <span style={{ fontSize: "25px" }}>★</span>}
              <Text fontSize="2xl" fontWeight="bold">
                {contact.first || contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}
              </Text>
            </HStack>
            <HStack w="100%">
              <Text fontSize="md" fontWeight="bold">
                Birthday:
              </Text>
              <Text fontSize="md">
                {contact.birthday ? FormatDate(contact.birthday) : "not known"}
              </Text>
            </HStack>
            <HStack w="100%">
              <Text fontSize="md" fontWeight="bold">
                Phone:
              </Text>
              <Text fontSize="md">
                {contact.phone ? contact.phone : "not known"}
              </Text>
            </HStack>
            <HStack w="100%">
              <Text fontSize="md" fontWeight="bold">
                Email:
              </Text>
              <Text fontSize="md">
                {contact.email ? contact.email : "not known"}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </NavLink>
  );
}
