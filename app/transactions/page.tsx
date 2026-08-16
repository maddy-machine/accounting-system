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
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No transactions yet.</td>
                </tr>
              )}
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.date.toLocaleDateString()}</td>
                  <td>{t.description}</td>
                  <td>{t.category}</td>
                  <td>
                    <span className={`badge ${t.type === 'INCOME' ? 'badge-success' : 'badge-warning'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={t.type === 'INCOME' ? 'text-success' : 'text-danger'}>
                    {t.type === 'INCOME' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td>{t.gstAmount ? `$${t.gstAmount.toFixed(2)}` : '-'}</td>
                  <td>
                    {t.receiptUrl ? (
                      <a href={t.receiptUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                        View
                      </a>
                    ) : '-'}
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
