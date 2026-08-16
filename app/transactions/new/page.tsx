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

      <div
        className="card card-tilt"
        style={{
          maxWidth: '600px',
          animation: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards',
        }}
      >
        <form action={createTransaction}>
          <div className="form-floating">
            <input type="text" id="tx-description" name="description" className="form-input" required placeholder=" " />
            <label className="form-label" htmlFor="tx-description">Description</label>
          </div>
          
          <div className="form-row">
            <div className="form-floating">
              <input type="number" id="tx-amount" name="amount" step="0.01" className="form-input" required placeholder=" " />
              <label className="form-label" htmlFor="tx-amount">Amount ($)</label>
            </div>
            
            <div className="form-floating">
              <select id="tx-type" name="type" className="form-input" required>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
              <label className="form-label" htmlFor="tx-type">Transaction Type</label>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-floating">
              <input type="text" id="tx-category" name="category" className="form-input" required placeholder=" " />
              <label className="form-label" htmlFor="tx-category">Category</label>
            </div>
            <div className="form-floating">
              <input type="number" id="tx-gst" name="gstAmount" step="0.01" className="form-input" placeholder=" " />
              <label className="form-label" htmlFor="tx-gst">GST Amount ($)</label>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px', display: 'block', color: 'var(--text-muted)' }}>Receipt (Optional)</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="form-input"
              accept="image/*,application/pdf"
              style={{ padding: '10px 18px' }}
            />
            {uploading && (
              <span style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '8px', display: 'inline-block' }}>
                ⟳ Uploading...
              </span>
            )}
            {receiptUrl && (
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✓ Uploaded successfully
                </span>
                <input type="hidden" name="receiptUrl" value={receiptUrl} />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="btn btn-primary btn-neon"
            disabled={uploading}
            style={{ padding: '12px 28px' }}
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  )
}
