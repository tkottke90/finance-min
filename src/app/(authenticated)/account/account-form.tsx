'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import DevOnly from "@/components/containers/dev-only";

interface User {
  id: number;
  uuid: string;
  name: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  email: string;
}

interface AccountFormProps {
  initialUser: User;
}

export default function AccountForm({ initialUser }: AccountFormProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(initialUser);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: initialUser.name || '',
    email: initialUser.email || ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      setError('No user session found');
      return;
    }

    // Basic validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Valid email is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/v1/users/${session.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
        }),
      });

      if (response.ok) {
        const updatedUser: User = await response.json();
        setUser(updatedUser);
        setSuccess('Account updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update account');
      }
    } catch (err) {
      console.error('Error updating account:', err);
      setError('Failed to update account');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card text-zinc-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Account</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Display Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleInputChange}
            disabled={saving}
            required
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            disabled={saving}
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-illuminating-emerald-500 text-white font-bold py-3 px-6 hover:bg-illuminating-emerald-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Updating...' : 'Update'}
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
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      </DevOnly>
    </div>
  );
}
