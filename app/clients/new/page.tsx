import { createClient } from '@/app/actions'
import Link from 'next/link'

export default function NewClient() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">New Client</h1>
        <Link href="/clients" className="btn">Cancel</Link>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <form action={createClient}>
          <div className="form-group">
            <label className="form-label">Contact Name</label>
            <input type="text" name="name" className="form-input" required placeholder="e.g. Jane Doe" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input type="text" name="company" className="form-input" placeholder="e.g. Acme Corp" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" placeholder="jane@example.com" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-input" placeholder="555-0100" />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">Save Client</button>
        </form>
      </div>
    </div>
  )
}
