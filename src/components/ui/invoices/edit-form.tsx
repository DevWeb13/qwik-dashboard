// src/components/ui/invoices/edit-form.tsx

import type { CustomerField, InvoiceForm } from "~/lib/definitions";
import {
  HiCheckOutline,
  HiClockOutline,
  HiCurrencyDollarOutline,
  HiUserCircleOutline,
} from "@qwikest/icons/heroicons";
import { Form, Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { component$ } from "@builder.io/qwik";
import { useUpdateInvoice } from "~/routes/dashboard/invoices/[id]/edit";

export const EditInvoiceForm = component$(
  ({
    invoice,
    customers,
  }: {
    invoice: InvoiceForm;
    customers: CustomerField[];
  }) => {
    const updateInvoiceAction = useUpdateInvoice();

    return (
      <Form action={updateInvoiceAction}>
        <div class="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer Name */}
          <div class="mb-4">
            <label for="customer" class="mb-2 block text-sm font-medium">
              Choose customer
            </label>
            <div class="relative">
              <select
                id="customer"
                name="customerId"
                class="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={invoice.customer_id}
              >
                <option>Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <HiUserCircleOutline class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Invoice Amount */}
          <div class="mb-4">
            <label for="amount" class="mb-2 block text-sm font-medium">
              Choose an amount
            </label>
            <div class="relative mt-2 rounded-md">
              <div class="relative">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={invoice.amount}
                  placeholder="Enter USD amount"
                  class="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <HiCurrencyDollarOutline class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend class="mb-2 block text-sm font-medium">
              Set the invoice status
            </legend>
            <div class="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div class="flex gap-4">
                <div class="flex items-center">
                  <input
                    id="pending"
                    name="status"
                    type="radio"
                    value="pending"
                    checked={invoice.status === "pending"}
                    class="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    for="pending"
                    class="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Pending <HiClockOutline class="h-4 w-4" />
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="paid"
                    name="status"
                    type="radio"
                    value="paid"
                    checked={invoice.status === "paid"}
                    class="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    for="paid"
                    class="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Paid <HiCheckOutline class="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            class="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Invoice</Button>
        </div>
      </Form>
    );
  },
);
