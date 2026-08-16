'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTransaction(formData: FormData) {
  const description = formData.get('description') as string
  const amount = parseFloat(formData.get('amount') as string)
  const gstAmount = formData.get('gstAmount') ? parseFloat(formData.get('gstAmount') as string) : null
  const category = formData.get('category') as string
  const type = formData.get('type') as string
  const receiptUrl = formData.get('receiptUrl') as string | null

  if (!description || !amount || !category || !type) return

  await prisma.transaction.create({
    data: {
      description,
      amount,
      gstAmount,
      category,
      type,
      receiptUrl,
    }
  })

  revalidatePath('/')
  revalidatePath('/transactions')
  redirect('/transactions')
}

export async function createClient(formData: FormData) {
  const name = formData.get('name') as string
  const company = formData.get('company') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string

  if (!name) return

  await prisma.client.create({
    data: { name, company, email, phone }
  })

  revalidatePath('/clients')
  redirect('/clients')
}

export async function createInvoice(data: {
  clientId: number;
  dueDate: string;
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
  subTotal: number;
  gstAmount: number;
  discount: number;
  totalAmount: number;
}) {
  if (!data.clientId || !data.dueDate || data.items.length === 0) return

  await prisma.invoice.create({
    data: {
      clientId: data.clientId,
      dueDate: new Date(data.dueDate),
      subTotal: data.subTotal,
      gstAmount: data.gstAmount,
      discount: data.discount,
      totalAmount: data.totalAmount,
      status: 'DRAFT',
      items: {
        create: data.items,
      }
    }
  })

  revalidatePath('/invoices')
}

export async function updateInvoiceStatus(id: number, status: string) {
  await prisma.invoice.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/invoices')
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const isTaxable = formData.get('isTaxable') === 'true'

  if (!name || !price) return

  await prisma.product.create({
    data: { name, description, price, isTaxable }
  })

  revalidatePath('/products')
  redirect('/products')
}

export async function getDashboardMetrics() {
  const transactions = await prisma.transaction.findMany();
  const invoices = await prisma.invoice.findMany({
    where: { status: { not: 'PAID' } }
  });

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const outstandingReceivable = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const netProfit = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, netProfit, outstandingReceivable };
}
