import './globals.css';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export const metadata = {
  title: 'Accounting System',
  description: 'Small Business Accounting System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div style={{ marginBottom: '32px', fontSize: '20px', fontWeight: 'bold', color: 'var(--foreground)' }}>
              Accounting<span style={{ color: 'var(--primary)' }}>Pro</span>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/" className="sidebar-nav-item active">
                Dashboard
              </Link>
              <Link href="/transactions" className="sidebar-nav-item">
                Transactions
              </Link>
              <Link href="/invoices" className="sidebar-nav-item">
                Invoices
              </Link>
              <Link href="/clients" className="sidebar-nav-item">
                Clients
              </Link>
              <Link href="/products" className="sidebar-nav-item">
                Products & Services
              </Link>
            </nav>
            <div style={{ marginTop: 'auto' }}>
              <Link href="/transactions/new" className="btn btn-primary" style={{ width: '100%' }}>
                + New Transaction
              </Link>
              <LogoutButton />
            </div>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
