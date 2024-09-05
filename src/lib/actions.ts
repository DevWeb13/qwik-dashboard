// src/lib/actions.ts

import { server$ } from "@builder.io/qwik-city";
import { getPool } from './data';

export const createInvoice = server$(async function (data: { customerId: string, amount: number, status: string }) {
  const amountInCents = Math.round(data.amount * 100);
  const date = new Date().toISOString().split('T')[0];
  
  const pool = await getPool();

  await pool.query(
    `INSERT INTO invoices (customer_id, amount, status, date)
      VALUES ($1, $2, $3, $4)`,
    [data.customerId, amountInCents, data.status, date],
  );

  //deconnect 
  await pool.end();

  return {
    customerId: data.customerId,
    amount: amountInCents,
    status: data.status,
    date: date
  };
});


export const updateInvoice = server$(async function (data: { id: string, customerId: string, amount: number, status: string }) {
  const amountInCents = Math.round(data.amount * 100);
  
  const pool = await getPool();

    await pool.query(
      `UPDATE invoices
       SET customer_id = $1, amount = $2, status = $3
       WHERE id = $4`,
      [data.customerId, amountInCents, data.status, data.id],
    );

    //deconnect
    await pool.end();

    return {
      id: data.id,
      customerId: data.customerId,
      amount: amountInCents,
      status: data.status,
    };
});


export const deleteInvoice = server$(async function (id: string) {
  const pool = await getPool();

  await pool.query(
    `DELETE FROM invoices
      WHERE id = $1`,
    [id],
  );

  //deconnect
  await pool.end();

  return {
    id: id,
  };
});