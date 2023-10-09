/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import {
  Links,
  Form,
  NavLink,
  LiveReload,
  Meta,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import styles from "./style/global.css";
import {
  json,
  redirect,
  LoaderFunctionArgs,
  LinksFunction,
} from "@remix-run/node";
import { createEmptyContact, getContacts } from "./data";
import { useEffect } from "react";
import { ActiveBadgeStyles, BadgeStyles, ButtonStyles } from "./style/myStyles";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function App() {
  const location = useLocation();
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <Flex w="100vw" h="100vh" bg="cyan.900">
            <VStack w="100%" position="fixed">
              <VStack w="100%" bg="gray.800" pt="20px" pb="5px">
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  w="100%"
                  maxW="600px"
                  zIndex="200"
                  justify={{ base: "center", sm: "space-between" }}
                >
                  <Form
                    id="search-form"
                    onChange={(event) => {
                      const isFirstSearch = q === null;
                      submit(event.currentTarget, {
                        replace: !isFirstSearch,
                      });
                    }}
                    role="search"
                  >
                    <input
                      id="q"
                      width="375px"
                      className={searching ? "loading" : ""}
                      aria-label="Search contacts"
                      placeholder="Search"
                      type="search"
                      name="q"
                      defaultValue={q || ""}
                    />
                    <div id="search-spinner" aria-hidden hidden={!searching} />
                  </Form>
                  <Form method="post">
                    <Button type="submit" {...ButtonStyles}>
                      New
                    </Button>
                  </Form>
                </Stack>
                <Box w="100vw" overflowX="auto" px={4}>
                  {contacts.length ? (
                    <HStack w="fit-content" py={6} spacing={4}>
                      {contacts.map((contact) => (
                        <Flex
                          key={contact.id}
                          {...(location.pathname.includes(
                            `contacts/${contact.id}`
                          )
                            ? { ...BadgeStyles, ...ActiveBadgeStyles }
                            : BadgeStyles)}
                        >
                          <NavLink
                            key={contact.id}
                            to={`contacts/${contact.id}`}
                          >
                            <Box>
                              {contact.first || contact.last ? (
                                <>
                                  {contact.first} {contact.last}
                                </>
                              ) : (
                                <i>No Name</i>
                              )}{" "}
                              {contact.favorite ? <span>★</span> : null}
                            </Box>
                          </NavLink>
                        </Flex>
                      ))}
                    </HStack>
                  ) : (
                    <p>
                      <i>No contacts</i>
                    </p>
                  )}
                </Box>{" "}
              </VStack>
              <Flex w="100%">
                <div
                  className={
                    navigation.state === "loading" && "searching"
                      ? "loading"
                      : ""
                  }
                  id="detail"
                >
                  <Flex
                    justify="center"
                    w="100%"
                    h="78vh"
                    flex="1"
                    overflowY="auto"
                  >
                    <Outlet />
                  </Flex>
                </div>
              </Flex>{" "}
            </VStack>
          </Flex>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
