// /src/routes/dashboard/layout.tsx

import { component$, Slot } from "@builder.io/qwik";
import { SideNav } from "~/components/ui/dashboard/sidenav";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "~/lib/data";

export const useFetchRevenue = routeLoader$(async () => {
  const revenue = await fetchRevenue();
  return revenue;
});

export const useFetchLatestInvoices = routeLoader$(async () => {
  const latestInvoices = await fetchLatestInvoices();
  return latestInvoices;
});

export const useFetchCardData = routeLoader$(async () => {
  const cardData = await fetchCardData();
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
