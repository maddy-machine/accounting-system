# Modern Accounting System

A comprehensive, web-based accounting and invoicing system built specifically for small businesses. 

## 🛠 Technologies Used

This project is built using a modern, robust tech stack to ensure performance, scalability, and ease of use:

*   **Frontend & Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions, Client Components)
*   **Language:** TypeScript / JavaScript
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Database:** SQLite (local development)
*   **Styling:** Vanilla CSS (Global Stylesheet for maximum flexibility)
*   **PDF Generation:** Native Browser Printing optimization

---

## 📖 User Manual

Welcome to your new Accounting System! Here is a step-by-step guide on how to navigate and use the application.

### 1. Dashboard (`/`)
The Dashboard is your command center. When you open the app, you will immediately see your **Total Income**, **Total Expenses**, **Net Profit**, and **Outstanding Accounts Receivable** (unpaid invoices). It also lists your most recent transactions for quick viewing.

### 2. Client Management (`/clients`)
Before creating an invoice, you need a client. 
- Go to the **Clients** tab and click "+ Add Client".
- Fill in their Name, Company, Email, and Phone number.
- These clients will now be available in the dropdown when creating an invoice.

### 3. Products & Services (`/products`)
To speed up invoicing, you can pre-define your offerings.
- Go to the **Products & Services** tab.
- Add items you frequently sell (e.g., "Web Design", "Consulting", "Server Hosting").
- Set a default price and specify whether the item is taxable. 

### 4. Invoicing (`/invoices`)
- Click "+ Create Invoice" from the Invoices tab.
- Select a client from the dropdown.
- Add one or more **Line Items** (Description, Quantity, Price). The subtotal will automatically calculate.
- Apply a **Discount** or enter a **GST Rate (%)** to automatically calculate taxes.
- Save the invoice. You can later click **"Mark Paid"** when the client pays you, or click **"Print / PDF"** to generate a clean, print-ready document to email to your client.

### 5. Transactions Ledger (`/transactions`)
This is where you log all day-to-day cash flow.
- Click "+ New Transaction".
- Choose whether it is **INCOME** or **EXPENSE**.
- Enter the amount, category (e.g., "Software Subscriptions", "Rent"), and optionally log the GST amount paid.
- **Upload a Receipt:** If this is an expense, you can upload a `.pdf`, `.png`, or `.jpg` of the physical receipt. You can later view this receipt directly from the Transactions ledger by clicking the "View" link.

---

## Getting Started (Installation)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the directory:
   ```bash
   cd "accounting system"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup the database (applies the schema to the local SQLite database):
   ```bash
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## License
MIT License
