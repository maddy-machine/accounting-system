import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create User
  const passwordHash = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: passwordHash,
      name: 'Admin User',
    },
  })

  console.log('Created User:', user.email)

  // Create Clients
  const client1 = await prisma.client.create({
    data: {
      name: 'Acme Corp',
      email: 'billing@acmecorp.com',
      company: 'Acme Corporation',
    }
  })

  const client2 = await prisma.client.create({
    data: {
      name: 'Stark Industries',
      email: 'tony@stark.com',
      company: 'Stark Industries',
    }
  })

  console.log('Created Clients')

  // Create Transactions
  await prisma.transaction.createMany({
    data: [
      { description: 'Office Supplies', amount: 150.00, type: 'EXPENSE', category: 'Equipment' },
      { description: 'Consulting Fee', amount: 3500.00, type: 'INCOME', category: 'Services' },
      { description: 'Software Subscription', amount: 45.99, type: 'EXPENSE', category: 'Software' },
      { description: 'Website Redesign', amount: 2000.00, type: 'INCOME', category: 'Services' },
      { description: 'Internet Bill', amount: 89.99, type: 'EXPENSE', category: 'Utilities' },
    ]
  })

  console.log('Created Transactions')

  // Create Invoices
  await prisma.invoice.createMany({
    data: [
      { clientId: client1.id, amount: 1500.00, status: 'PAID', dueDate: new Date('2026-08-01') },
      { clientId: client2.id, amount: 4500.00, status: 'SENT', dueDate: new Date('2026-09-15') },
      { clientId: client1.id, amount: 800.00, status: 'DRAFT', dueDate: new Date('2026-09-30') },
    ]
  })

  console.log('Created Invoices')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
