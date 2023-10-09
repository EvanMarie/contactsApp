import { Card, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { ContactMutation } from "~/data";

export const ButtonStyles = {
  h: "40px",
  bg: "cyan.400",
  color: "gray.900",
  borderRadius: "md",
  _hover: {
    bg: "purple.200",
  },
};

export const BadgeStyles = {
  bg: "purple.200",
  color: "cyan.900",
  display: "flex",
  justify: "center",
  align: "center",
  shadow: "xl",
  minW: "150px",
  fontWeight: "bold",
  borderRadius: "md",
  h: "35px",
  w: "fit-content",
  px: 2,
  fontSize: "md",
  whiteSpace: "nowrap" as const,
  border: "1.5px solid",
  _hover: {
    bg: "gray.600",
    color: "cyan.400",
  },
};

export const ActiveBadgeStyles = {
  bg: "cyan.400",
  color: "gray.900",
};

export function ContactMiniCard({ contact }: { contact: ContactMutation }) {
  return (
    <NavLink key={contact.id} to={`contacts/${contact.id}`}>
      <Card
        bg="cyan.500"
        py={3}
        px={5}
        rounded="lg"
        w="350px"
        h="250px"
        shadow="2xl"
        border="2px solid"
        _hover={{
          bg: "purple.200",
          cursor: "pointer",
        }}
        transition="all 0.2s ease-in-out"
      >
        <VStack w="100%">
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
              Twitter:
            </Text>
            <Text fontSize="md">{contact.twitter}</Text>
          </HStack>
        </VStack>
      </Card>
    </NavLink>
  );
}

export function Welcome() {
  return (
    <Flex w="100%" maxW="600px">
      <h1>Welcome to Contacts!</h1>
    </Flex>
  );
}
