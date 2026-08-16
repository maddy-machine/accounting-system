'use client';

import { useState } from 'react';
import { createInvoice } from '@/app/actions';

export default function InvoiceForm({ clients, products }: { clients: any[], products: any[] }) {
  const [clientId, setClientId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [gstRate, setGstRate] = useState(0); // e.g. 5 for 5%

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
    <form onSubmit={handleSubmit}>
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

      <div style={{ marginTop: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Line Items</h3>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="form-input" style={{ flex: 2 }} required />
            <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="form-input" style={{ flex: 1 }} required min="1" />
            <input type="number" placeholder="Price" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', e.target.value)} className="form-input" style={{ flex: 1 }} required step="0.01" />
            <div style={{ padding: '8px', width: '80px', textAlign: 'right' }}>${item.total.toFixed(2)}</div>
          </div>
        ))}
        <button type="button" onClick={addItem} className="btn" style={{ fontSize: '12px', marginTop: '8px' }}>+ Add Item</button>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        <div>Subtotal: <strong>${subTotal.toFixed(2)}</strong></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Discount ($): <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="form-input" style={{ width: '80px', padding: '4px' }} step="0.01" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          GST Rate (%): <input type="number" value={gstRate} onChange={e => setGstRate(Number(e.target.value))} className="form-input" style={{ width: '80px', padding: '4px' }} step="0.1" />
        </div>
        <div>GST Amount: <strong>${gstAmount.toFixed(2)}</strong></div>
        <div style={{ fontSize: '18px', marginTop: '8px' }}>Total: <strong>${totalAmount.toFixed(2)}</strong></div>
      </div>
      
      <button type="submit" className="btn btn-primary" style={{ marginTop: '24px', width: '100%' }}>Create Invoice</button>
    </form>
  )
}
