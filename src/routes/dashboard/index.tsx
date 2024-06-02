// src/routes/dashboard/index.tsx

import { Resource, component$, useResource$ } from "@builder.io/qwik";

import { RevenueChart } from "~/components/ui/dashboard/revenue-chart";
import { Card } from "~/components/ui/dashboard/cards";
import { LatestInvoices } from "~/components/ui/dashboard/latest-invoices";
// import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "~/lib/data";

// export const useFetchData = routeLoader$(() => {
//   return async () => {
//     const [revenue, latestInvoices, cardData] = await Promise.all([
//       fetchRevenue(),
//       fetchLatestInvoices(),
//       fetchCardData(),
//     ]);
//     return { revenue, latestInvoices, cardData };
//   };
// });

export default component$(() => {
  // const data = useFetchData();

  const dataResource = useResource$(async () => {
    const [revenue, latestInvoices, cardData] = await Promise.all([
      fetchRevenue(),
      fetchLatestInvoices(),
      fetchCardData(),
    ]);
    return { revenue, latestInvoices, cardData };
  });

  return (
    <main>
      <h1 class="lusitana mb-4 text-xl md:text-2xl">Dashboard</h1>
      <Resource
        value={dataResource}
        onResolved={({ revenue, latestInvoices, cardData }) => {
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
                <RevenueChart revenue={revenue} />
                <LatestInvoices latestInvoices={latestInvoices} />
              </div>
            </>
          );
        }}
        onRejected={(error) => {
          return <div>Error: {error.message}</div>;
        }}
        onPending={() => {
          return <div>Loading...</div>;
        }}
      />
    </main>
  );
});
