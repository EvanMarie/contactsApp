/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Flex,
  HStack,
  Image,
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
  useNavigate,
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
import { TimeWidget } from "./components/timeWidget";

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
    href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700;800;900&family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function App() {
  const location = useLocation();
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const navigate = useNavigate();
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
              bgGradient="linear(to-r, gray.700, cyan.900, cyan.900, gray.700)"
              shadow="0px 0px 10px rgba(0,0,0,0.7)"
            >
              <VStack w="100%" maxW="1500px" position="fixed">
                <VStack
                  w="100%"
                  bg="gray.800"
                  pt="20px"
                  pb="5px"
                  borderBottom="1px solid cyan"
                  position="relative"
                >
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    w="100%"
                    maxW="750px"
                    px={2}
                    zIndex="200"
                    spacing={4}
                    justify={{ base: "center", md: "space-evenly" }}
                    align={{ base: "center", md: "center" }}
                  >
                    <HStack w="100%" justify="center" spacing={4}>
                      <Button
                        onClick={() => {
                          navigate("/");
                        }}
                        {...ButtonStyles}
                      >
                        <HStack>
                          <Image
                            src="/contactsImage.png"
                            h="30px"
                            objectFit="cover"
                          />
                          <Text>Contacts</Text>
                        </HStack>
                      </Button>
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
                    </HStack>

                    <Flex w={{ base: "auto", md: "50%" }} justify="center">
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
                    </Flex>
                  </Stack>{" "}
                  <Flex w="100%" justify="center" pr="10px">
                    <TimeWidget />
                  </Flex>
                  <Box
                    w="100%"
                    overflowX="auto"
                    pl="10px"
                    pt={2}
                    sx={scrollBarStyles}
                  >
                    {contacts.length ? (
                      <HStack w="fit-content" pb={3} spacing={4}>
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
                  <Outlet />
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
