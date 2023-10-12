/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { getContact } from "~/myFakeData";
import { Favorite } from "~/routes/contacts.$contactId";
import FormatDate from "~/utils/formateDate";
import { scrollBarStyles, ButtonStyles } from "~/style/myStyles";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export function ContactFullCard() {
  const { contact } = useLoaderData<typeof loader>();
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
    <Flex
      justify="center"
      w="100%"
      h={{ base: "75vh", sm: "81vh" }}
      flex="1"
      overflowY="auto"
      sx={scrollBarStyles}
      pb={{ base: "80px", md: "0px" }}
      align={{ base: "flex-start", md: "center" }}
    >
      <Card
        bg="gray.700"
        color="white"
        p={5}
        rounded="lg"
        w="95%"
        maxH={{ base: "auto", md: "675px" }}
        overflowY="auto"
        sx={{ ...scrollBarStyles }}
        maxW="650px"
        shadow="2xl"
        border="1.5px solid"
        transition="all 0.2s ease-in-out"
        pt={2}
        position="relative"
      >
        <HStack spacing={3} position="absolute" top="15px" right="15px">
          <Favorite contact={contact} />
          <Form action="edit">
            <IconButton
              type="submit"
              aria-label="edit contact"
              {...ButtonStyles}
              px={2}
              minW="40px"
              icon={<EditIcon boxSize={5} />}
            />
          </Form>
          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <IconButton
              type="submit"
              aria-label="delete contact"
              {...ButtonStyles}
              px={2}
              minW="40px"
              icon={<DeleteIcon boxSize={5} />}
            />
          </Form>
        </HStack>
        <VStack w="100%" spacing={3}>
          <HStack w="100%">
            {contact.favorite && (
              <span style={{ fontSize: "33px", color: "#B794F4" }}>★</span>
            )}
            <Text
              fontWeight="bold"
              color="cyan.400"
              fontSize={{ base: "3xl", sm: "4xl" }}
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
            w="100%"
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
                  Array.isArray(contact.tags) &&
                  contact.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      h="16px"
                      bg="purple.200"
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
                  {showFullAbout ? (
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
    </Flex>
  );
}
