// src/routes/dashboard/invoices/index.tsx

import { Pagination } from "~/components/ui/invoices/pagination";
import { Search } from "~/components/ui/search";
import { Table } from "~/components/ui/invoices/table";
import { CreateInvoice } from "~/components/ui/invoices/buttons";
import { InvoicesTableSkeleton } from "~/components/ui/skeletons";
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { fetchFilteredInvoices, fetchInvoicesPages } from "~/lib/data";

export default component$(() => {
  const loc = useLocation();

  // const query = searchParams.get("query") || "";
  // const currentPage = Number(searchParams.get("page")) || 1;

  const invoicesResource = useResource$(async ({ track }) => {
    track(() => loc.url.search); // Track the URL search params
    const searchParams = loc.url.searchParams;
    const query = searchParams.get("query") || "";
    const currentPage = Number(searchParams.get("page")) || 1;
    const filteredInvoices = await fetchFilteredInvoices(query, currentPage);
    // console.log("filteredInvoices", filteredInvoices);
    return filteredInvoices;
  });

  const totalPagesResource = useResource$(async () => {
    const searchParams = loc.url.searchParams;
    const query = searchParams.get("query") || "";
    return fetchInvoicesPages(query);
  });

  return (
    <div class="w-full">
      <div class="flex w-full items-center justify-between">
        <h1 class="lusitana text-2xl">Invoices</h1>
      </div>
      <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Resource
        value={invoicesResource}
        onResolved={(invoices) => {
          return <Table invoices={invoices} />;
        }}
        onPending={() => <InvoicesTableSkeleton />}
        onRejected={(error) => {
          console.error(error);
          return <div>Error</div>;
        }}
      />
      <div class="mt-5 flex w-full justify-center">
        <Resource
          value={totalPagesResource}
          onResolved={(totalPages) => {
            return <Pagination totalPages={totalPages} />;
          }}
          onPending={() => null}
          onRejected={(error) => {
            console.error(error);
            return <div>Error</div>;
          }}
        />
      </div>
    </div>
  );
});
