// src/lib/actions.ts

import { server$ } from "@builder.io/qwik-city";
import { getPool } from './data';

export const createInvoice = server$(async function (data: { customerId: string, amount: number, status: string }) {
  const amountInCents = Math.round(data.amount * 100);
  const date = new Date().toISOString().split('T')[0];
  
  const pool = await getPool();

  try {
    await pool.query(
      `INSERT INTO invoices (customer_id, amount, status, date)
       VALUES ($1, $2, $3, $4)`,
      [data.customerId, amountInCents, data.status, date],
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create invoice.');
  }
});