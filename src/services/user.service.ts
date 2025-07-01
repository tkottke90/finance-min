'use server';

import { FormState } from "@/interfaces/form.interface";
import { UpdateUserDetails } from "@/interfaces/user.interface";
import { prisma } from "@/lib/prisma-client";

export async function getUserByUUID(uuid: string) {
  return await prisma.user.findUnique({
    where: {
      uuid,
    },
  });
}

export async function updateUserDetails(prevState: FormState<UpdateUserDetails> | undefined, formData: FormData): Promise<FormState<UpdateUserDetails>> {
  const name = formData.get('name') as string ?? undefined;
  const email = formData.get('email') as string ?? undefined;

  const uuid = formData.get('uuid') as string;

  if (!uuid) {
    return {
      isSuccess: false,
      message: 'Invalid Request - UUID is required',
      formState: prevState?.formState || { uuid: '', name: '', email: '' }
    };
  }

  if (!name || name.trim().length === 0) {
    return {
      isSuccess: false,
      message: 'Name is required',
      formState: prevState?.formState || { uuid, name: '', email: email || '' }
    };
  }

  if (!email || email.trim().length === 0 || !email.includes('@')) {
    return {
      isSuccess: false,
      message: 'Valid email is required',
      formState: prevState?.formState || { uuid, name: name || '', email: '' }
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { uuid },
      data: {
        name: name.trim(),
        email: email.trim()
      }
    });

    return {
      isSuccess: true,
      message: 'Account updated successfully',
      formState: {
        uuid: updatedUser.uuid,
        name: updatedUser.name || '',
        email: updatedUser.email || ''
      }
    };

  } catch (error) {
    console.error('Error updating user:', error);
    return {
      isSuccess: false,
      message: 'Failed to update account',
      formState: prevState?.formState || { uuid, name: name || '', email: email || '' }
    };
  }
}
