// src/routes/dashboard/invoices/index.tsx

import { component$ } from "@builder.io/qwik";
import { Pagination } from "~/components/ui/invoices/pagination";
import { Search } from "~/components/ui/search";
import { Table } from "~/components/ui/invoices/table";
import { CreateInvoice } from "~/components/ui/invoices/buttons";
import { routeAction$ } from "@builder.io/qwik-city";
import { deleteInvoice } from "~/lib/actions";

export const useDeleteInvoice = routeAction$(async (data) => {
  const deletedInvoiceId = await deleteInvoice(data.id.toString());
  return {
    success: true,
    deletedInvoiceId,
  };
});

export default component$(() => {
  return (
    <div class="w-full">
      <div class="flex w-full items-center justify-between">
        <h1 class="lusitana text-2xl">Invoices</h1>
      </div>
      <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Table />
      <div class="mt-5 flex w-full justify-center">
        <Pagination />
      </div>
    </div>
  );
});
