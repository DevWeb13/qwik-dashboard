// src/routes/dashboard/index.tsx

import { component$ } from "@builder.io/qwik";
import { useFetchRevenue } from "./layout";
import { RevenueChart } from "~/components/ui/dashboard/revenue-chart";

export default component$(() => {
  const revenue = useFetchRevenue().value;

  return (
    <main>
      <h1 class="lusitana mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
      </div>
    </main>
  );
});
