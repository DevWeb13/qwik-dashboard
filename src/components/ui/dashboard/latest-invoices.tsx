// src/components/ui/dashboard/latest-invoices.tsx

import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { HiArrowPathOutline } from "@qwikest/icons/heroicons";
import { fetchLatestInvoices } from "~/lib/data";
import { InvoiceSkeleton } from "~/components/ui/skeletons";

export const LatestInvoices = component$(() => {
  const latestInvoicesResource = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const latestInvoices = await fetchLatestInvoices();
    return { latestInvoices };
  });
  return (
    <Resource
      value={latestInvoicesResource}
      onResolved={({ latestInvoices }) => {
        return (
          <div class="flex w-full flex-col md:col-span-4">
            <h2 class="lusitana mb-4 text-xl md:text-2xl">Latest Invoices</h2>
            <div class="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
              <div class="bg-white px-6">
                {latestInvoices.map((invoice, i) => {
                  return (
                    <div
                      key={invoice.id}
                      class={
                        "flex flex-row items-center justify-between py-4" +
                        (i !== 0 ? " border-t" : "")
                      }
                    >
                      <div class="flex items-center">
                        <img
                          src={invoice.image_url}
                          alt={`${invoice.name}'s profile picture`}
                          class="mr-4 rounded-full"
                          width={32}
                          height={32}
                        />
                        <div class="min-w-0">
                          <p class="truncate text-sm font-semibold md:text-base">
                            {invoice.name}
                          </p>
                          <p class="hidden text-sm text-gray-500 sm:block">
                            {invoice.email}
                          </p>
                        </div>
                      </div>
                      <p
                        class={`lusitana truncate text-sm font-medium md:text-base`}
                      >
                        {invoice.amount}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div class="flex items-center pb-2 pt-6">
                <HiArrowPathOutline class="h-5 w-5 text-gray-500" />
                <h3 class="ml-2 text-sm text-gray-500 ">Updated just now</h3>
              </div>
            </div>
          </div>
        );
      }}
      onRejected={(error) => {
        return <div>Error: {error.message}</div>;
      }}
      onPending={() => {
        return <InvoiceSkeleton />;
      }}
    />
  );
});
