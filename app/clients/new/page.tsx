import { createClient } from '@/app/actions'
import Link from 'next/link'

export default function NewClient() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">New Client</h1>
        <Link href="/clients" className="btn">Cancel</Link>
      </div>

      <div className="card card-tilt" style={{ maxWidth: '600px' }}>
        <form action={createClient}>
          <div className="form-floating">
            <input type="text" id="client-name" name="name" className="form-input" required placeholder=" " />
            <label className="form-label" htmlFor="client-name">Contact Name</label>
          </div>
          
          <div className="form-floating">
            <input type="text" id="client-company" name="company" className="form-input" placeholder=" " />
            <label className="form-label" htmlFor="client-company">Company Name (Optional)</label>
          </div>

          <div className="form-row">
            <div className="form-floating">
              <input type="email" id="client-email" name="email" className="form-input" placeholder=" " />
              <label className="form-label" htmlFor="client-email">Email Address</label>
            </div>
            
            <div className="form-floating">
              <input type="tel" id="client-phone" name="phone" className="form-input" placeholder=" " />
              <label className="form-label" htmlFor="client-phone">Phone Number</label>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-neon" style={{ padding: '12px 28px' }}>Save Client</button>
        </form>
      </div>
    </div>
  )
}
