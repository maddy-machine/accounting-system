import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import InvoiceForm from './InvoiceForm'

export default async function NewInvoice() {
  const clients = await prisma.client.findMany({
    orderBy: { name: 'asc' }
  })
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">New Invoice</h1>
        <Link href="/invoices" className="btn">Cancel</Link>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <InvoiceForm clients={clients} products={products} />
      </div>
    </div>
  )
}
