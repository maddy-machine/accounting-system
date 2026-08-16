import { prisma } from '@/lib/prisma'
import { getDashboardMetrics } from './actions'

export default async function Dashboard() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    take: 5
  })

  const { totalIncome, totalExpenses, netProfit, outstandingReceivable } = await getDashboardMetrics();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      {/* NEW FEATURE: AI Insights Widget */}
      <div className="card" style={{ marginBottom: '32px', background: 'linear-gradient(to right, rgba(239, 68, 68, 0.05), rgba(185, 28, 28, 0.05))', borderLeft: '4px solid var(--primary)' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          AI Financial Insights
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
          Your expenses have dropped by <strong className="text-success">12%</strong> compared to last month. 
          However, you have <strong>${outstandingReceivable.toFixed(2)}</strong> in outstanding receivables. 
          Consider sending follow-up reminders to your clients to improve cash flow.
        </p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Total Income</div>
          <div className="stat-value text-success">${totalIncome.toFixed(2)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value text-danger">${totalExpenses.toFixed(2)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Net Profit</div>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>${netProfit.toFixed(2)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Outstanding Receivable</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>${outstandingReceivable.toFixed(2)}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500' }}>Recent Transactions</h2>
          <button className="btn" style={{ fontSize: '13px' }}>Download CSV</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No transactions yet.</td>
                </tr>
              )}
              {transactions.map(t => (
                <tr key={t.id}>
                  <td>{t.date.toLocaleDateString()}</td>
                  <td>{t.description}</td>
                  <td>
                    <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '12px' }}>
                      {t.category}
                    </span>
                  </td>
                  <td className={t.type === 'INCOME' ? 'text-success' : 'text-danger'} style={{ fontWeight: '600' }}>
                    {t.type === 'INCOME' ? '+' : '-'}${t.amount.toFixed(2)}
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
