'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut()} 
      className="btn" 
      style={{ width: '100%', marginTop: '16px', color: 'var(--danger)' }}
    >
      Sign Out
    </button>
  )
}
