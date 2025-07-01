'use client';

import { useActionState } from "react";
import { useSession } from "next-auth/react";
import DevOnly from "@/components/containers/dev-only";
import { AccountPageStyles } from "./account.styles";
import { useSignal } from "@preact/signals-react";
import { updateUserDetails } from "@/services/user.service";

interface User {
  id: number;
  uuid: string;
  name: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AccountFormProps {
  initialUser: User;
}

export default function AccountForm({ initialUser }: AccountFormProps) {
  const errorMsg = useSignal('');
  const successMsg = useSignal('');
  
  const { data: session } = useSession();
  const [formData, updateUser, isLoading] = useActionState(updateUserDetails, undefined);

  return (
    <div className={AccountPageStyles}>
      <h1 className="text-3xl font-bold mb-6">Account</h1>

      {/* Error Message */}
      {errorMsg.value && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMsg}
        </div>
      )}

      {/* Success Message */}
      {successMsg.value && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMsg}
        </div>
      )}

      <form action={updateUser}>
        <input type="hidden" name="uuid" readOnly value={initialUser.uuid} />
        <div className="form-field">
          <label htmlFor="name">Display Name</label>
          <input
            suppressHydrationWarning={true}
            type="text"
            id="name"
            name="name"
            className="form-input"
            defaultValue={formData?.formState?.name ?? initialUser.name ?? ''}
            disabled={isLoading}
            required
            autoComplete="off"
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            suppressHydrationWarning={true}
            type="email"
            id="email"
            name="email"
            className="form-input"
            defaultValue={formData?.formState?.email ?? initialUser.email ?? ''}
            disabled={isLoading}
            required
            autoComplete="off"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-illuminating-emerald-500 text-white font-bold py-3 px-6 hover:bg-illuminating-emerald-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <span className="animate-pulse">Updating...</span> : 'Update'}
          </button>
        </div>
      </form>

      <DevOnly>
        <hr />
        <details className="mt-4">
          <summary className="cursor-pointer text-sm">Raw Session Data (Development)</summary>
          <pre className="w-full mt-2 text-xs bg-gray-100 text-black p-2 rounded overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </details>
        
        <details className="mt-4">
          <summary className="cursor-pointer text-sm">Raw User Data (Development)</summary>
          <pre className="w-full mt-2 text-xs bg-gray-100 text-black p-2 rounded overflow-auto">
            {JSON.stringify(initialUser, null, 2)}
          </pre>
        </details>
      </DevOnly>
    </div>
  );
}
