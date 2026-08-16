'use client';

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn" style={{ padding: '4px 8px', fontSize: '12px', marginLeft: '8px' }}>
      Print / PDF
    </button>
  );
}
