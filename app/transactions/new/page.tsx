'use client'

import { createTransaction } from '@/app/actions'
import Link from 'next/link'
import { useState } from 'react'

export default function NewTransaction() {
  const [uploading, setUploading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setReceiptUrl(data.url);
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
    setUploading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">New Transaction</h1>
        <Link href="/transactions" className="btn">Cancel</Link>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <form action={createTransaction}>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" name="description" className="form-input" required placeholder="e.g. Office Supplies" />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount ($)</label>
              <input type="number" name="amount" step="0.01" className="form-input" required placeholder="0.00" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Type</label>
              <select name="type" className="form-input" required>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input type="text" name="category" className="form-input" required placeholder="e.g. Equipment" />
            </div>
            <div className="form-group">
              <label className="form-label">GST Amount ($)</label>
              <input type="number" name="gstAmount" step="0.01" className="form-input" placeholder="0.00" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Receipt (Optional)</label>
            <input type="file" onChange={handleFileUpload} className="form-input" accept="image/*,application/pdf" />
            {uploading && <span style={{ fontSize: '12px', color: 'blue' }}>Uploading...</span>}
            {receiptUrl && (
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '12px', color: 'green' }}>✓ Uploaded</span>
                <input type="hidden" name="receiptUrl" value={receiptUrl} />
              </div>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={uploading}>Save Transaction</button>
        </form>
      </div>
    </div>
  )
}
