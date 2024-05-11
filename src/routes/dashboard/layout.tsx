// /src/routes/dashboard/layout.tsx

import { component$, Slot } from "@builder.io/qwik";
import { SideNav } from "~/components/ui/dashboard/sidenav";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "~/lib/data";

export const useFetchRevenue = routeLoader$(async () => {
  console.log("fetching revenue started...");
  const revenue = await fetchRevenue();
  console.log("fetching revenue done...");
  return revenue;
});

export const useFetchLatestInvoices = routeLoader$(async () => {
  console.log("fetching latest invoices started...");
  const latestInvoices = await fetchLatestInvoices();
  console.log("fetching latest invoices done...");
  return latestInvoices;
});

export const useFetchCardData = routeLoader$(async () => {
  console.log("fetching card data started...");
  const cardData = await fetchCardData();
  console.log("fetching card data done...");
  return cardData;
});

export default component$(() => {
  return (
    <div class="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div class="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div class="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Slot />
      </div>
    </div>
  );
});
