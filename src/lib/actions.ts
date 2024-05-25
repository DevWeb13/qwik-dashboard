// src/lib/actions.ts

import { server$ } from "@builder.io/qwik-city";
import { getPool } from './data';

// Retirez le schéma Zod d'ici car la validation se fait déjà dans l'action de route

export const createInvoice = server$(async function (data: { customerId: string, amount: number, status: string }) {
  // Les données sont déjà validées par l'action de route, donc pas besoin de valider à nouveau ici
  const amountInCents = Math.round(data.amount * 100); // Arrondir pour éviter les problèmes de précision
  const date = new Date().toISOString();
  const pool = await getPool();

  try {
    await pool.query(
      `INSERT INTO invoices (customer_id, amount, status, date)
       VALUES ($1, $2, $3, $4)`,
      [data.customerId, amountInCents, data.status, date],
    );
    await pool.end();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create invoice.');
  }
});




export const updateInvoice = server$(async function (data: { id: string, customerId: string, amount: number, status: string }) {
  const amountInCents = Math.round(data.amount * 100); // Arrondir pour éviter les problèmes de précision
  const pool = await getPool();

  try {
    await pool.query(
      `UPDATE invoices
       SET customer_id = $1, amount = $2, status = $3
       WHERE id = $4`,
      [data.customerId, amountInCents, data.status, data.id],
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update invoice.');
  }
});

export const deleteInvoice = server$(async function (data: { id: string }) {
  const pool = await getPool();

  try {
    await pool.query(
      `DELETE FROM invoices
       WHERE id = $1`,
      [data.id],
    );

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete invoice.');
  }
});