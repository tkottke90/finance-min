'use client';

import DrawerLayout from "@/components/containers/drawer";
import { AppLinks } from "../app-links";
import { z } from "zod";
import { useActionState } from "react";
import { Account } from "next-auth";
import { ZodFormState } from "@/lib/validation";
import { useSession } from "next-auth/react";
import DevOnly from "@/components/containers/dev-only";

const AccountFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }).trim()
});

type FormState = ZodFormState<typeof AccountFormSchema>;

function updateAccount(state: FormState, formData: FormData) {
  const validatedInput = AccountFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email')
  });

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
      message: "Please check the form for errors."
    };
  }

  // Validate the user updating the account is the same as the user in the database
  if (validatedInput.data.email !== account.email) {
    return {
      errors: {
        email: ["Email is not the same as the one in the database."]
      },
      message: "Please check the form for errors."
    };
  }
}

export default function AccountPage() {
  const { data: session } = useSession();

  return (
    <DrawerLayout className="min-h-screen bg-gray-50 py-8" links={AppLinks}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Account</h1>

          <form>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                defaultValue={session?.user.name ?? ''}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-input"
                defaultValue={session?.user.email ?? ''}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button type="submit" className="bg-illuminating-emerald-500 text-white font-bold py-3 px-6 hover:bg-illuminating-emerald-600 rounded">
                Update
              </button>
            </div>
          </form>

          <DevOnly>
            <hr />
            <details className="mt-4">
              <summary className="cursor-pointer text-sm">
                Raw Session Data (Development)
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </details>
          </DevOnly>
        </div>
      </div>
    </DrawerLayout>
  );
}
