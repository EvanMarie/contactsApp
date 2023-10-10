/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
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
import { createEmptyContact, getContacts } from "./myFakeData";
// import { getContacts } from "~/data";
import { useEffect } from "react";
import {
  ActiveBadgeStyles,
  BadgeStyles,
  ButtonStyles,
  InputStyles,
  scrollBarStyles,
} from "./style/myStyles";
import CustomTheme from "./style/theme";
import { Search2Icon } from "@chakra-ui/icons";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },
];

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
        <ChakraProvider theme={CustomTheme}>
          <Flex w="100vw" h="100vh" justify="center" bg="gray.900">
            <Flex
              w="100%"
              maxW="1500px"
              bg="cyan.900"
              shadow="0px 0px 10px rgba(0,0,0,0.7)"
            >
              <VStack w="100%" maxW="1500px" position="fixed">
                <VStack
                  w="100%"
                  bg="gray.800"
                  pt="20px"
                  pb="5px"
                  borderBottom="1px solid cyan"
                >
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    w="100%"
                    maxW="700px"
                    px={4}
                    zIndex="200"
                    spacing={4}
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
                      <InputGroup>
                        <InputLeftElement color="cyan.200">
                          <Search2Icon />
                        </InputLeftElement>{" "}
                        <Input
                          id="q"
                          aria-label="Search contacts"
                          placeholder="Search Contacts"
                          type="search"
                          name="q"
                          defaultValue={q || ""}
                          sx={InputStyles}
                          focusBorderColor="cyan.400"
                        />
                      </InputGroup>
                      <div
                        id="search-spinner"
                        aria-hidden
                        hidden={!searching}
                      />
                    </Form>
                    <Form method="post">
                      <Button type="submit" {...ButtonStyles}>
                        <HStack w="100%">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            width="25px"
                            height="25px"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          <Text>New Contact</Text>
                        </HStack>
                      </Button>
                    </Form>
                    <Button {...ButtonStyles} as={NavLink} to="/">
                      <HStack w="100%" justify="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          width="25px"
                          height="25px"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>

                        <Text>Home</Text>
                      </HStack>
                    </Button>
                  </Stack>
                  <Box w="100%" overflowX="auto" px={4} sx={scrollBarStyles}>
                    {contacts.length ? (
                      <HStack w="fit-content" py={6} spacing={4}>
                        {contacts.map((contact) => (
                          <Box position="relative" key={contact.id}>
                            {contact.favorite && (
                              <Badge
                                position="absolute"
                                top="-2"
                                right="-2"
                                display="flex"
                                rounded="full"
                                h="30px"
                                py="3px"
                                px="5px"
                                bg="purple.400"
                                color="white"
                                fontSize="1rem"
                                textShadow="1px 1px 3px black"
                                shadow="lg"
                              >
                                ★
                              </Badge>
                            )}
                            <Flex
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
                                <Box pr={contact.favorite ? "5px" : ""}>
                                  {contact.first || contact.last ? (
                                    <>
                                      {contact.first} {contact.last}
                                    </>
                                  ) : (
                                    <i>No Name</i>
                                  )}{" "}
                                </Box>
                              </NavLink>
                            </Flex>
                          </Box>
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
                  <Flex
                    justify="center"
                    w="100%"
                    h={{ base: "75vh", sm: "81vh" }}
                    flex="1"
                    overflowY="auto"
                    sx={scrollBarStyles}
                    pb="20px"
                  >
                    <Outlet />
                  </Flex>
                </Flex>{" "}
              </VStack>
            </Flex>
          </Flex>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
