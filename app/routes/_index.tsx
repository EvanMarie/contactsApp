import { Box, Wrap } from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ContactMutation, getContacts } from "~/data";
import { ContactMiniCard, Welcome } from "~/style/myStyles";

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
    <Wrap w="100%" maxW="1200px" spacingY={3} spacingX={5}>
      {shouldDisplayMiniCards ? (
        contacts.map((contact: ContactMutation) => (
          <ContactMiniCard key={contact.id} contact={contact} />
        ))
      ) : (
        <Welcome />
      )}
    </Wrap>
  );
}
