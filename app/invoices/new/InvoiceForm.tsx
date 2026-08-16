'use client';

import { useState } from 'react';
import { createInvoice } from '@/app/actions';

export default function InvoiceForm({ clients, products }: { clients: any[], products: any[] }) {
  const [clientId, setClientId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [gstRate, setGstRate] = useState(0);

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    const item = newItems[index] as any;
    item[field] = value;
    
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = Number(item.quantity) * Number(item.unitPrice);
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const subTotal = items.reduce((sum, item) => sum + item.total, 0);
  const gstAmount = (subTotal - discount) * (gstRate / 100);
  const totalAmount = subTotal - discount + gstAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createInvoice({
      clientId: Number(clientId),
      dueDate,
      items: items.map(i => ({ description: i.description, quantity: Number(i.quantity), unitPrice: Number(i.unitPrice), total: Number(i.total) })),
      subTotal,
      gstAmount,
      discount,
      totalAmount
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ animation: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards' }}
    >
      <div className="form-group">
        <label className="form-label">Client</label>
        <select value={clientId} onChange={e => setClientId(e.target.value)} className="form-input" required>
          <option value="">Select a Client...</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="form-input" required />
      </div>

      <div style={{ marginTop: '28px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent)' }}>✦</span>
          Line Items
        </h3>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '10px',
              alignItems: 'center',
              animation: `fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s backwards`,
            }}
          >
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={e => handleItemChange(index, 'description', e.target.value)}
              className="form-input"
              style={{ flex: 2 }}
              required
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={e => handleItemChange(index, 'quantity', e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
              required
              min="1"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.unitPrice}
              onChange={e => handleItemChange(index, 'unitPrice', e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
              required
              step="0.01"
            />
            <div style={{
              padding: '10px 16px',
              width: '100px',
              textAlign: 'right',
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: '14px',
              background: 'var(--accent-soft)',
              borderRadius: '8px',
              border: '1px solid rgba(244, 208, 63, 0.1)',
            }}>
              ${item.total.toFixed(2)}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="btn"
          style={{ fontSize: '12px', marginTop: '8px', padding: '8px 16px' }}
        >
          + Add Item
        </button>
      </div>

      {/* Totals */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-end',
      }}>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Subtotal: <strong style={{ color: 'var(--foreground)' }}>${subTotal.toFixed(2)}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Discount ($):</span>
          <input
            type="number"
            value={discount}
            onChange={e => setDiscount(Number(e.target.value))}
            className="form-input"
            style={{ width: '90px', padding: '6px 12px', fontSize: '14px' }}
            step="0.01"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>GST Rate (%):</span>
          <input
            type="number"
            value={gstRate}
            onChange={e => setGstRate(Number(e.target.value))}
            className="form-input"
            style={{ width: '90px', padding: '6px 12px', fontSize: '14px' }}
            step="0.1"
          />
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          GST Amount: <strong style={{ color: 'var(--foreground)' }}>${gstAmount.toFixed(2)}</strong>
        </div>
        <div style={{
          fontSize: '20px',
          marginTop: '8px',
          fontWeight: 600,
          background: 'linear-gradient(135deg, var(--accent), var(--primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
      
      <button
        type="submit"
        className="btn btn-primary"
        style={{ marginTop: '28px', width: '100%', padding: '14px' }}
      >
        Create Invoice
      </button>
    </form>
  )
}
