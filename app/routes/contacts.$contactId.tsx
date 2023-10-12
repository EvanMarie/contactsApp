import { useFetcher } from "@remix-run/react";
import { useState, type FunctionComponent } from "react";

// import { getContact, type ContactRecord, updateContact } from "../data";
import { getContact, type ContactRecord, updateContact } from "~/myFakeData";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Flex, VStack } from "@chakra-ui/react";
import { ContactFullCard } from "~/components/cardLarge";

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
  return (
    <VStack w="100%">
      <Flex w="100%" justify="center">
        <ContactFullCard />
      </Flex>
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
