'use server';

import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import { sql } from '@vercel/postgres'
import { z } from 'zod';

import { signIn } from '@/auth'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Amount must be greater than 0' }),
  status: z.enum(['pending', 'paid'], {
    message: 'Please select an invoice status'
  }),
  date: z.string()
});

const CreateFormSchema = FormSchema.omit({ id: true, date: true });
const UpdateFormSchema = FormSchema.omit({ id:true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateFormSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES(${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error(`Database Error: An error occurred while creating the invoice ${error}`)
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateFormSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice',
    }
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(`Database Error: An error occurred while updating the invoice. ${error}`)
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');

    console.warn('Invoice deleted successfully.');
  } catch (error) {
    console.error(`Database Error: An error occurred while deleting the invoice. ${error}`)
  }

}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
){
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials. Please try again.';
        default:
          return 'An error occurred. Please try again.';
      }
    }
    throw error;
  }
}