import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

// import { getContact, updateContact } from "../data";
import { getContact, updateContact } from "~/myFakeData";
import {
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ButtonStyles, InputStyles } from "~/style/myStyles";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import FormatDate from "~/utils/formateDate";

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
  const updates = Object.fromEntries(formData);
  console.log("updates", updates);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

const HStackStyles = {
  spacing: 3,
  w: "100%",
  maxW: "525px",
  justify: "space-between",
};

interface InputFieldProps {
  defaultValue: string | undefined;
  fieldName: string;
  placeholder: string;
  ariaLabel: string;
  labelText: string;
  inputType?: "input" | "textarea";
}

function InputField({
  defaultValue,
  fieldName,
  placeholder,
  ariaLabel,
  labelText,
  inputType = "input",
}: InputFieldProps) {
  return (
    <HStack {...HStackStyles}>
      <Text
        color="purple.200"
        fontWeight="bold"
        textShadow="1px 1px 2px black"
        fontSize="lg"
      >
        {labelText}
      </Text>
      {inputType === "input" ? (
        <Input
          {...InputStyles}
          w={{ base: "300px", sm: "375px" }}
          aria-label={ariaLabel}
          defaultValue={defaultValue}
          name={fieldName}
          placeholder={placeholder}
          type="text"
          focusBorderColor="cyan.400"
          rounded="sm"
          h="35px"
        />
      ) : (
        <Textarea
          {...InputStyles}
          w={{ base: "300px", sm: "375px" }}
          resize="none"
          defaultValue={defaultValue}
          name={fieldName}
          placeholder={placeholder}
          rows={7}
        />
      )}
    </HStack>
  );
}

export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <Form id="contact-form" method="post" style={{ width: "100%" }}>
      <Flex w="97%" justify="center" pt={4} pb="60px">
        <VStack
          w="100%"
          maxW={{ base: "500px", lg: "1200px" }}
          pt={4}
          spacing={4}
          bg="gray.500"
          p={4}
          rounded="md"
          shadow="2xl"
        >
          <Stack
            w="100%"
            spacing={4}
            direction={{ base: "column", lg: "row" }}
            justify={{ base: "center", lg: "space-between" }}
            align={{ base: "center", lg: "flex-start" }}
          >
            <VStack w={{ base: "100%", lg: "50%" }} spacing={4}>
              <InputField
                defaultValue={contact.first}
                fieldName="first"
                placeholder="First"
                ariaLabel="First name"
                labelText="First Name"
              />
              <InputField
                defaultValue={contact.last}
                fieldName="last"
                placeholder="Last"
                ariaLabel="Last name"
                labelText="Last Name"
              />
              <InputField
                defaultValue={contact.company}
                fieldName="company"
                placeholder="Company"
                ariaLabel="Company"
                labelText="Company"
              />
              <InputField
                defaultValue={contact.phone}
                fieldName="phone"
                placeholder="Phone"
                ariaLabel="Phone"
                labelText="Phone"
              />
              <InputField
                defaultValue={contact.email}
                fieldName="email"
                placeholder="Email"
                ariaLabel="Email"
                labelText="Email"
              />
              <InputField
                defaultValue={contact.birthday && FormatDate(contact.birthday)}
                fieldName="birthday"
                placeholder="MM/DD/YYYY"
                ariaLabel="Birthday"
                labelText="Birthday"
              />
              <InputField
                defaultValue={String(contact.age)}
                fieldName="age"
                placeholder="age"
                ariaLabel="age"
                labelText="Age"
              />
              <InputField
                defaultValue={contact.gender}
                fieldName="gender"
                placeholder="gender"
                ariaLabel="gender"
                labelText="Gender"
              />
              <InputField
                defaultValue={contact.avatar}
                fieldName="avatar"
                placeholder="https://example.com/avatar.jpg"
                ariaLabel="Avatar URL"
                labelText="Avatar"
              />
            </VStack>
            <VStack w={{ base: "100%", lg: "50%" }} spacing={4}>
              <InputField
                defaultValue={
                  contact.tags ? contact.tags.join(", ") : undefined
                }
                fieldName="tags"
                placeholder="Tags"
                ariaLabel="Tags"
                labelText="Tags"
              />
              <InputField
                defaultValue={contact.address}
                fieldName="address"
                placeholder="Address"
                ariaLabel="Address"
                labelText="Address"
              />

              <InputField
                defaultValue={contact.notes}
                fieldName="notes"
                placeholder="Notes"
                ariaLabel="Notes"
                labelText="Notes"
                inputType="textarea"
              />

              <InputField
                defaultValue={contact.about}
                fieldName="about"
                placeholder="Job Title"
                ariaLabel="About"
                labelText="About"
                inputType="textarea"
              />
            </VStack>
          </Stack>
          <HStack {...HStackStyles} w={{ base: "300px", sm: "400px" }}>
            <Button
              type="submit"
              {...ButtonStyles}
              leftIcon={<CheckCircleIcon boxSize={4} />}
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              {...ButtonStyles}
              leftIcon={<SmallCloseIcon boxSize={7} />}
            >
              Cancel
            </Button>
          </HStack>{" "}
        </VStack>
      </Flex>{" "}
    </Form>
  );
}
