import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Transactions() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transactions Ledger</h1>
        <Link href="/transactions/new" className="btn btn-primary">+ New Transaction</Link>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>GST</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px', opacity: 0.3 }}>⟐</div>
                    No transactions yet.
                  </td>
                </tr>
              )}
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.date.toLocaleDateString()}</td>
                  <td style={{ color: 'var(--foreground)', fontWeight: 500 }}>{t.description}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      background: 'var(--primary-soft)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                    }}>
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${t.type === 'INCOME' ? 'badge-success' : 'badge-warning'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={t.type === 'INCOME' ? 'text-success' : 'text-danger'} style={{ fontWeight: 600 }}>
                    {t.type === 'INCOME' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{t.gstAmount ? `$${t.gstAmount.toFixed(2)}` : '—'}</td>
                  <td>
                    {t.receiptUrl ? (
                      <a
                        href={t.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--accent)',
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '13px',
                          transition: 'color 0.2s',
                        }}
                      >
                        View ↗
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>—</span>
                    )}
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
