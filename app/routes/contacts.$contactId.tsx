import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useState, type FunctionComponent } from "react";

// import { getContact, type ContactRecord, updateContact } from "../data";
import { getContact, type ContactRecord, updateContact } from "~/myFakeData";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Box, HStack, IconButton, VStack } from "@chakra-ui/react";
import { ButtonStyles, ContactFullCard } from "~/style/myStyles";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <VStack w="100%" pt={4}>
      <Box position="relative">
        <ContactFullCard contact={contact} />
        <HStack spacing={3} position="absolute" top="15px" right="50px">
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
      </Box>
    </VStack>
  );
}

export const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? "#D6BCFA" : "#0BC5EA",
    padding: "0px 8px",
    borderRadius: "4px",
    height: "40px",
    width: "40px",
    fontSize: "25px",
    background: "#0BC5EA",
    transition: "background-color 0.3s ease-in-out",
  };

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
