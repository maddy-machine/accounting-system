'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◈' },
  { href: '/transactions', label: 'Transactions', icon: '⟐' },
  { href: '/invoices', label: 'Invoices', icon: '❑' },
  { href: '/clients', label: 'Clients', icon: '◉' },
  { href: '/products', label: 'Products & Services', icon: '✦' },
];

export default function AnimatedSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Accounting<span className="sidebar-logo-accent">Pro</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-nav-item ${isActive(item.href) ? 'active' : ''}`}
            style={{
              animationName: 'slideInLeft',
              animationDuration: '0.4s',
              animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              animationFillMode: 'backwards',
              animationDelay: `${0.1 + index * 0.06}s`,
            }}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animationName: 'fadeInUp',
          animationDuration: '0.5s',
          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          animationFillMode: 'backwards',
          animationDelay: '0.4s',
        }}
      >
        <Link
          href="/transactions/new"
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          + New Transaction
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
