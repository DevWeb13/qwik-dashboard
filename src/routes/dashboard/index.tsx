// src/routes/dashboard/index.tsx

import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { RevenueChart } from "~/components/ui/dashboard/revenue-chart";
import { Card } from "~/components/ui/dashboard/cards";
import { LatestInvoices } from "~/components/ui/dashboard/latest-invoices";
import { fetchCardData } from "~/lib/data";
import { DashboardSkeleton } from "~/components/ui/skeletons";

export default component$(() => {
  const dataResource = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const cardData = await fetchCardData();
    return { cardData };
  });

  return (
    <main>
      <h1 class="lusitana mb-4 text-xl md:text-2xl">Dashboard</h1>
      <Resource
        value={dataResource}
        onResolved={({ cardData }) => {
          const {
            totalPaidInvoices,
            totalPendingInvoices,
            numberOfInvoices,
            numberOfCustomers,
          } = cardData;
          return (
            <>
              <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card
                  title="Collected"
                  value={totalPaidInvoices}
                  type="collected"
                />
                <Card
                  title="Pending"
                  value={totalPendingInvoices}
                  type="pending"
                />
                <Card
                  title="Total Invoices"
                  value={numberOfInvoices}
                  type="invoices"
                />
                <Card
                  title="Total Customers"
                  value={numberOfCustomers}
                  type="customers"
                />
              </div>
              <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart />
                <LatestInvoices />
              </div>
            </>
          );
        }}
        onRejected={(error) => {
          return <div>Error: {error.message}</div>;
        }}
        onPending={() => {
          return <DashboardSkeleton />;
        }}
      />
    </main>
  );
});
