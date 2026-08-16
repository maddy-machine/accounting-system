import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Clients() {
  const clients = await prisma.client.findMany({
    orderBy: { name: 'asc' },
    include: {
      invoices: true
    }
  })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Clients</h1>
        <Link href="/clients/new" className="btn btn-primary">+ New Client</Link>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Invoices</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px', opacity: 0.3 }}>◉</div>
                    No clients yet.
                  </td>
                </tr>
              )}
              {clients.map((client) => (
                <tr key={client.id}>
                  <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{client.name}</td>
                  <td>{client.company || <span style={{ opacity: 0.4 }}>—</span>}</td>
                  <td style={{ color: 'var(--accent-dark)' }}>{client.email || <span style={{ opacity: 0.4, color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      background: 'var(--accent-soft)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      border: '1px solid rgba(244, 208, 63, 0.15)',
                    }}>
                      {client.invoices.length}
                    </span>
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
