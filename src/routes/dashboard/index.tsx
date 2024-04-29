import { component$ } from "@builder.io/qwik";
// import { Card } from "~/components/ui/dashboard/cards";
// import { RevenueChart } from "~/components/ui/dashboard/revenue-chart";
// import LatestInvoices from "~/ui/dashboard/latest-invoices";

// import {
//   useFetchCardData,
//   useFetchLatestInvoices,
//   useFetchRevenue,
// } from "./layout";
// import { LatestInvoices } from "~/components/ui/dashboard/latest-invoices";
// import { Card } from "~/components/ui/dashboard/cards";

export default component$(() => {
  // const revenue = useFetchRevenue().value;
  // console.log("revenue", revenue);

  // const latestInvoices = useFetchLatestInvoices().value;

  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = useFetchCardData().value;

  return (
    <main>
      <h1 class={`lusitana mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      {/* <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div> */}
    </main>
  );
});
