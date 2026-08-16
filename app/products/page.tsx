import { prisma } from '@/lib/prisma';
import { createProduct } from '../actions';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">Products & Services</h1>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px', fontWeight: '500' }}>Add New Product/Service</h2>
        <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Name</label>
            <input name="name" type="text" required className="form-input" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Description</label>
            <input name="description" type="text" className="form-input" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Price</label>
            <input name="price" type="number" step="0.01" required className="form-input" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <input name="isTaxable" type="checkbox" value="true" defaultChecked />
              Is Taxable?
            </label>
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Product
          </button>
        </form>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Taxable</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>No products found.</td>
                </tr>
              )}
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{p.name}</td>
                  <td style={{ padding: '12px' }}>{p.description || '-'}</td>
                  <td style={{ padding: '12px' }}>${p.price.toFixed(2)}</td>
                  <td style={{ padding: '12px' }}>{p.isTaxable ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
