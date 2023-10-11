import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { useState } from "react";
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
  fontWeight: "bold",
  fontSize: { base: "md", md: "lg" },
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
  shadow: "2xl",
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

export function ContactFullCard({ contact }: { contact: ContactMutation }) {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullNotes, setShowFullNotes] = useState(false);
  const labelStyles = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "cyan.200",
  };

  interface SingleFieldProps {
    label: string;
    value: string | undefined;
  }

  function SingleField({ label, value }: SingleFieldProps) {
    return (
      <HStack w="100%" align="flex-start">
        <Text {...labelStyles}>{label}:</Text>
        <Text fontSize="md">{value ? value : "not known"}</Text>
      </HStack>
    );
  }
  return (
    <Card
      bg="gray.700"
      color="white"
      p={5}
      rounded="lg"
      w="95%"
      maxW="650px"
      shadow="2xl"
      border="1.5px solid"
      transition="all 0.2s ease-in-out"
      pt={2}
    >
      <VStack w="100%" spacing={3}>
        <HStack w="100%">
          {contact.favorite && (
            <span style={{ fontSize: "33px", color: "#B794F4" }}>★</span>
          )}
          <Text
            fontWeight="bold"
            color="cyan.400"
            fontSize="4xl"
            textShadow="1px 1px 2px black"
          >
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
          </Text>{" "}
        </HStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 2, md: 4 }}
        >
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
          <VStack w={{ base: "100%", md: "50%" }} spacing={1}>
            <SingleField label="Company" value={contact.company} />
            <SingleField label="Phone" value={contact.phone} />
            <SingleField label="Email" value={contact.email} />
            <SingleField
              label="Birthday"
              value={contact.birthday && FormatDate(contact.birthday)}
            />
            <SingleField label="Age" value={String(contact.age)} />

            <HStack w="100%">
              <Text {...labelStyles}>Gender: </Text>
              <Text fontSize="md">
                {" "}
                {contact.gender ? contact.gender : "gender unknown"}
              </Text>
            </HStack>

            <Wrap w="100%" align="center">
              <Text {...labelStyles}> Tags:</Text>
              {contact.tags &&
                contact.tags.map((tag) => (
                  <Badge
                    h="16px"
                    bg="purple.200"
                    key={tag}
                    shadow="1px 1px 2px black"
                  >
                    {tag}
                  </Badge>
                ))}
            </Wrap>
          </VStack>
        </Stack>
        <SingleField label="Address" value={contact.address} />
        <VStack w="100%" spacing={0} align="flex-start">
          <HStack w="100%" justify="space-between">
            <Text {...labelStyles}>About:</Text>
            {contact.notes && (
              <Text
                color="cyan.200"
                cursor="pointer"
                onClick={() => setShowFullAbout(!showFullAbout)}
              >
                {showFullNotes ? (
                  <ChevronUpIcon boxSize={6} />
                ) : (
                  <ChevronDownIcon boxSize={6} />
                )}
              </Text>
            )}
          </HStack>
          <Text noOfLines={showFullAbout ? undefined : 3}>
            {contact.about ? contact.about : "No info"}
          </Text>
        </VStack>

        <VStack w="100%" spacing={0} align="flex-start">
          <HStack w="100%" justify="space-between">
            <Text {...labelStyles}>Notes:</Text>
            {contact.notes && (
              <Text
                color="cyan.200"
                cursor="pointer"
                onClick={() => setShowFullNotes(!showFullNotes)}
              >
                {showFullNotes ? (
                  <ChevronUpIcon boxSize={6} />
                ) : (
                  <ChevronDownIcon boxSize={6} />
                )}
              </Text>
            )}
          </HStack>
          <Text noOfLines={showFullNotes ? undefined : 3}>
            {contact.notes ? contact.notes : "No notes"}
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}
