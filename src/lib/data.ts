// src/lib/data.ts

import { createPool } from '@vercel/postgres';
import { LatestInvoiceRaw, Revenue } from './definitions';
import { formatCurrency } from './utils';
import { server$ } from '@builder.io/qwik-city';

const getPool = server$(function () {

  const connectionString = this.env.get('POSTGRES_URL'); // Get the connection string from the environment variables
  if(!connectionString) throw new Error('POSTGRES_URL environment variable is not set');

  // Create a new pool with the connection string
  const pool = createPool({
    connectionString: connectionString,
  });

  if(!pool) throw new Error('Failed to create a new pool');

  return pool;
})

export const fetchRevenue = server$(async function () {
  // Open a new connection
  const pool = await getPool();
  try {
    const { rows } = await pool.query<Revenue>('SELECT * FROM revenue');
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data: ' + (error as Error).message);
  } finally {
    await pool.end(); // Ensure the connection is always closed
  }
});

export const fetchLatestInvoices = server$(async function () {
  const pool = await  getPool();
  try {
    const data = await pool.query<LatestInvoiceRaw>(`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`);

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  } finally {
    await pool.end();
  }
});

export const fetchCardData = server$(async function () {  
  const pool = await  getPool();
  try {
    // You can probably combine these into a single pool.query query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = pool.query(`SELECT COUNT(*) FROM invoices`);
    const customerCountPromise = pool.query(`SELECT COUNT(*) FROM customers`);
    const invoiceStatusPromise = pool.query(`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  } finally {
    await pool.end();
  }
});