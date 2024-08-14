// src/lib/actions.ts

import { server$ } from "@builder.io/qwik-city";

export const createInvoice = server$(async function (data: { customerId: string, amount: number, status: string }) {
  console.log(data);
  return  data.amount, data.customerId, data.status ;
});