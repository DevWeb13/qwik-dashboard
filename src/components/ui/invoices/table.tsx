// src/components/ui/invoices/table.tsx

// import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "~/components/ui/invoices/buttons";
import { InvoiceStatus } from "~/components/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "~/lib/utils";
// import { fetchFilteredInvoices } from "~/lib/data";
import {
  // Resource,
  component$,
  // useResource$,
  // useSignal,
} from "@builder.io/qwik";
import type { InvoicesTable } from "~/lib/definitions";

export const Table = component$(
  ({ invoices }: { invoices: InvoicesTable[] }) => {
    // console.log("querySignal", querySignal.value);

    return (
      <div class="mt-6 flow-root">
        <div class="inline-block min-w-full align-middle">
          <div class="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div class="md:hidden">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  class="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div class="flex items-center justify-between border-b pb-4">
                    <div>
                      <div class="mb-2 flex items-center">
                        {/* <Image
                            src={invoice.image_url}
                            class="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${invoice.name}'s profile picture`}
                          /> */}
                        <p>{invoice.name}</p>
                      </div>
                      <p class="text-sm text-gray-500">{invoice.email}</p>
                    </div>
                    <InvoiceStatus status={invoice.status} />
                  </div>
                  <div class="flex w-full items-center justify-between pt-4">
                    <div>
                      <p class="text-xl font-medium">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <p>{formatDateToLocal(invoice.date)}</p>
                    </div>
                    <div class="flex justify-end gap-2">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table class="hidden min-w-full text-gray-900 md:table">
              <thead class="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" class="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" class="relative py-3 pl-6 pr-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    class="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td class="whitespace-nowrap py-3 pl-6 pr-3">
                      <div class="flex items-center gap-3">
                        {/* <Image
                        src={invoice.image_url}
                        class="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                        <p>{invoice.name}</p>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-3">{invoice.email}</td>
                    <td class="whitespace-nowrap px-3 py-3">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td class="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(invoice.date)}
                    </td>
                    <td class="whitespace-nowrap px-3 py-3">
                      <InvoiceStatus status={invoice.status} />
                    </td>
                    <td class="whitespace-nowrap py-3 pl-6 pr-3">
                      <div class="flex justify-end gap-3">
                        <UpdateInvoice id={invoice.id} />
                        <DeleteInvoice id={invoice.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
);
