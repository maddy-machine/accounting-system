import { prisma } from '@/lib/prisma'
import { getDashboardMetrics } from './actions'
import SplineSceneWrapper from '@/components/SplineSceneWrapper'
export default async function Dashboard() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    take: 5
  })

  const { totalIncome, totalExpenses, netProfit, outstandingReceivable } = await getDashboardMetrics();

  return (
    <div>
      {/* Stats Bento Grid */}
      <div className="stats-grid">
        {/* Hero with Spline 3D (Wide & Tall) */}
        <div className="dashboard-hero bento-wide bento-tall card card-tilt" style={{ margin: 0, padding: 0 }}>
          <SplineSceneWrapper
            scene="https://prod.spline.design/6Wq1Q7YGyM-uBg18/scene.splinecode"
          />
          <div className="dashboard-hero-content" style={{ padding: '28px', pointerEvents: 'none' }}>
            <h1 className="dashboard-hero-title">
              Welcome back ✦
            </h1>
            <p className="dashboard-hero-subtitle">
              Here&apos;s your financial overview.
            </p>
          </div>
        </div>

        <div className="card stat-card card-tilt">
          <div className="stat-label">Total Income</div>
          <div className="stat-value text-success">${totalIncome.toFixed(2)}</div>
        </div>

        <div className="card stat-card card-tilt">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value text-danger">${totalExpenses.toFixed(2)}</div>
        </div>

        <div className="card stat-card card-tilt">
          <div className="stat-label">Net Profit</div>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>${netProfit.toFixed(2)}</div>
        </div>

        <div className="card stat-card card-tilt">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>${outstandingReceivable.toFixed(2)}</div>
        </div>

        {/* AI Insights (Wide) */}
        <div className="card ai-insights-card bento-wide card-tilt" style={{ margin: 0 }}>
          <h2 style={{ fontSize: '17px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, var(--accent), var(--primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '20px',
            }}>✦</span>
            AI Financial Insights
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7' }}>
            Your expenses have dropped by <strong className="text-success">12%</strong> compared to last month. 
            However, you have <strong style={{ color: 'var(--accent)' }}>${outstandingReceivable.toFixed(2)}</strong> in outstanding receivables. 
            Consider sending follow-up reminders to your clients to improve cash flow.
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card card-tilt" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '500' }}>Recent Transactions</h2>
          <button className="btn btn-liquid" style={{ fontSize: '13px', padding: '8px 16px' }}>Download CSV</button>
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
