import { ActionFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { deleteContact } from "~/myFakeData";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.contactId, "missing contactId param");
  await deleteContact(params.contactId);
  return redirect("/");
};
