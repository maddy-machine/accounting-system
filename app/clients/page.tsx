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
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No clients yet.</td>
                </tr>
              )}
              {clients.map((client) => (
                <tr key={client.id}>
                  <td style={{ fontWeight: 500 }}>{client.name}</td>
                  <td>{client.company || '-'}</td>
                  <td>{client.email || '-'}</td>
                  <td>{client.invoices.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
