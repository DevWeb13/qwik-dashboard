import { component$ } from "@builder.io/qwik";
import { HiCheckOutline, HiClockOutline } from "@qwikest/icons/heroicons";

export const InvoiceStatus = component$(({ status }: { status: string }) => {
  return (
    <span
      class={
        "inline-flex items-center rounded-full px-2 py-1 text-xs" +
        " " +
        (status === "pending" ? "bg-gray-100 text-gray-500" : "") +
        " " +
        (status === "paid" ? "bg-green-500 text-white" : "")
      }
    >
      {status === "pending" ? (
        <>
          Pending
          <HiClockOutline class="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "paid" ? (
        <>
          Paid
          <HiCheckOutline class="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
});
