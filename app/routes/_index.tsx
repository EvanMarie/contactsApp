import { Flex, Wrap } from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ContactMutation, getContacts } from "~/myFakeData";
// import { ContactMutation, getContacts } from "~/data";
import { ContactMiniCard, scrollBarStyles } from "~/style/myStyles";
import Welcome from "~/components/welcome";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let contacts: ContactMutation[] = []; // Specify the type as ContactMutation[]

  if (q) {
    // Search query exists, fetch contacts
    contacts = await getContacts(q);
  }

  return json({ contacts });
};

export default function Index() {
  const { contacts } = useLoaderData<typeof loader>();

  // Check if there are contacts and display mini cards only if contacts exist
  const shouldDisplayMiniCards = contacts.length > 0;

  return (
    <Flex
      justify="center"
      w="100%"
      h={{ base: "75vh", sm: "81vh" }}
      flex="1"
      overflowY="auto"
      sx={scrollBarStyles}
      py="20px"
      align="flex-start"
    >
      <Wrap w="100%" maxW="1200px" spacingY={3} spacingX={5} justify="center">
        {shouldDisplayMiniCards ? (
          contacts.map((contact: ContactMutation) => (
            <ContactMiniCard key={contact.id} contact={contact} />
          ))
        ) : (
          <Welcome />
        )}
      </Wrap>
    </Flex>
  );
}
