'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut()} 
      className="btn logout-btn" 
      style={{ 
        width: '100%', 
        marginTop: '8px', 
        color: 'var(--danger)',
        borderColor: 'rgba(231, 76, 60, 0.15)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      Sign Out
    </button>
  )
}
