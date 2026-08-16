import './globals.css';
import AnimatedSidebar from '@/components/AnimatedSidebar';

export const metadata = {
  title: 'AccountingPro — Premium Financial Management',
  description: 'Premium small business accounting system with AI insights, invoicing, and financial tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="layout">
          <AnimatedSidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
