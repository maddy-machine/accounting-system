import { prisma } from '@/lib/prisma';
import { createProduct } from '../actions';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Products & Services</h1>
      </div>

      {/* Add Product Form */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '20px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent)' }}>✦</span>
          Add New Product/Service
        </h2>
        <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Name</label>
            <input name="name" type="text" required className="form-input" placeholder="e.g. Web Development" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description</label>
            <input name="description" type="text" className="form-input" placeholder="Brief description..." />
          </div>
          <div className="form-row">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Price ($)</label>
              <input name="price" type="number" step="0.01" required className="form-input" placeholder="0.00" />
            </div>
            <div className="form-group" style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-end' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                padding: '13px 18px',
                background: 'rgba(10, 10, 11, 0.6)',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                width: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}>
                <input name="isTaxable" type="checkbox" value="true" defaultChecked style={{
                  accentColor: 'var(--primary)',
                  width: '16px',
                  height: '16px',
                }} />
                Is Taxable
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }}>
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Taxable</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px', opacity: 0.3 }}>✦</div>
                    No products found.
                  </td>
                </tr>
              )}
              {products.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{p.name}</td>
                  <td>{p.description || <span style={{ opacity: 0.4 }}>—</span>}</td>
                  <td style={{ color: 'var(--accent)', fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${p.isTaxable ? 'badge-success' : 'badge-warning'}`}>
                      {p.isTaxable ? 'Yes' : 'No'}
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
