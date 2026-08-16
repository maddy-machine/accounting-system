import { prisma } from '@/lib/prisma'
import { updateInvoiceStatus } from '@/app/actions'
import Link from 'next/link'
import PrintButton from './PrintButton'

export default async function Invoices() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true }
  })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Invoices</h1>
        <Link href="/invoices/new" className="btn btn-primary">+ Create Invoice</Link>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px', opacity: 0.3 }}>❑</div>
                    No invoices yet.
                  </td>
                </tr>
              )}
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ color: 'var(--foreground)', fontWeight: 600 }}>INV-{inv.id.toString().padStart(3, '0')}</td>
                  <td style={{ color: 'var(--foreground)' }}>{inv.client?.name || 'Unknown'}</td>
                  <td>{inv.dueDate.toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${inv.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent)' }}>${inv.totalAmount.toFixed(2)}</td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {inv.status !== 'PAID' && (
                      <form action={async () => {
                        'use server'
                        await updateInvoiceStatus(inv.id, 'PAID')
                      }}>
                        <button
                          type="submit"
                          className="btn"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Mark Paid
                        </button>
                      </form>
                    )}
                    <PrintButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
