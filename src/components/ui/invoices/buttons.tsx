import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  HiPencilOutline,
  HiTrashOutline,
  HiPlusOutline,
} from "@qwikest/icons/heroicons";

export const CreateInvoice = component$(() => {
  return (
    <Link
      href="/dashboard/invoices/create"
      class="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span class="hidden md:block">Create Invoice</span>{" "}
      <HiPlusOutline class="h-5 md:ml-4" />
    </Link>
  );
});

export const UpdateInvoice = component$(() => {
  return (
    <Link
      href="/dashboard/invoices"
      class="rounded-md border p-2 hover:bg-gray-100"
    >
      <HiPencilOutline class="w-5" />
    </Link>
  );
});

export const DeleteInvoice = component$(() => {
  return (
    <>
      <button class="rounded-md border p-2 hover:bg-gray-100">
        <span class="sr-only">Delete</span>
        <HiTrashOutline class="w-5" />
      </button>
    </>
  );
});
