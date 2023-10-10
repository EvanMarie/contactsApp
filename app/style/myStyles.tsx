import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
// import { ContactMutation } from "~/data";
import { ContactMutation } from "~/myFakeData";
import FormatDate from "~/utils/formateDate";

export const ButtonStyles = {
  h: "40px",
  w: "fit-content",
  minW: "150px",
  px: 4,
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

export function Welcome() {
  return (
    <Flex w="100%" maxW="600px">
      <h1>Welcome to Contacts!</h1>
    </Flex>
  );
}

export const scrollBarStyles = {
  // For Chrome, Safari, and newer versions of Edge
  "&::-webkit-scrollbar": {
    width: "7px",
    height: "7px",
    backgroundColor: "gray.700",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "purple.200",
    borderRadius: "7px",
    minHeight: "50px",
    maxHeight: "150px",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "purple.300",
    transition: "all 0.3s ease-in-out",
  },
};

export const InputStyles = {
  bg: "gray.700",
  w: "375px",
  color: "gray.50",
  border: "2px solid",
  borderColor: "gray.700",
  borderRadius: "md",
  _hover: {
    bg: "gray.600",
    borderColor: "gray.600",
  },
  _focus: {
    bg: "gray.600",
    borderColor: "gray.600",
  },
};
