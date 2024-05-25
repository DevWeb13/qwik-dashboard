// src/lib/data.ts

import { createPool } from '@vercel/postgres';
import { CustomerField, InvoicesTable, LatestInvoiceRaw, Revenue } from './definitions';
import { formatCurrency } from './utils';
import { server$ } from '@builder.io/qwik-city';

export const getPool = server$(function () {
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

    // Close the connection
    await pool.end();
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data: ' + (error as Error).message);
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
    await pool.end();
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
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

    await pool.end();

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
});

const ITEMS_PER_PAGE = 6;

export const fetchFilteredInvoices = server$(async function (
  query: string,
  currentPage: number,
) {
  console.log('query', query);
  console.log('currentPage', currentPage);
  const pool = await getPool();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await pool.query<InvoicesTable>(`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
      ORDER BY invoices.date DESC
      LIMIT $2 OFFSET $3
    `, [`%${query}%`, ITEMS_PER_PAGE, offset]);

    // console.log('invoices', invoices);
    await pool.end();

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
});



export const fetchInvoicesPages = server$(async function (query: string) {
  const pool = await getPool();
  try {
    const count = await pool.query(`SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
    `, [`%${query}%`]);

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    await pool.end();
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
);

export const fetchCustomers = server$(async function () {
  const pool = await getPool();
  try {
    const data = await pool.query<CustomerField>('SELECT id, name FROM customers ORDER BY name ASC');
    const customers = data.rows;
    await pool.end();
    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
});

