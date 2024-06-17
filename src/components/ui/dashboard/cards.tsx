import { Resource, component$, useResource$ } from "@builder.io/qwik";
import {
  HiBanknotesOutline,
  HiClockOutline,
  HiUserGroupOutline,
  HiInboxOutline,
} from "@qwikest/icons/heroicons";
import { fetchCardData } from "~/lib/data";
import { CardsSkeleton } from "~/components/ui/skeletons";

const iconMap = {
  collected: HiBanknotesOutline,
  customers: HiUserGroupOutline,
  pending: HiClockOutline,
  invoices: HiInboxOutline,
};

export const Card = component$(
  ({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: "invoices" | "customers" | "pending" | "collected";
  }) => {
    const Icon = iconMap[type];

    return (
      <div class="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div class="flex p-4">
          <Icon class="h-5 w-5 text-gray-700" />
          <h3 class="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          class="lusitana
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
          {value}
        </p>
      </div>
    );
  },
);

export const CardsWrapper = component$(() => {
  const cardDataResource = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const cardData = await fetchCardData();
    return { cardData };
  });
  return (
    <Resource
      value={cardDataResource}
      onResolved={({ cardData }) => {
        const {
          totalPaidInvoices,
          totalPendingInvoices,
          numberOfInvoices,
          numberOfCustomers,
        } = cardData;
        return (
          <>
            <Card
              title="Collected"
              value={totalPaidInvoices}
              type="collected"
            />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
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
          </>
        );
      }}
      onRejected={(error) => {
        return <div>Error: {error.message}</div>;
      }}
      onPending={() => {
        return <CardsSkeleton />;
      }}
    />
  );
});
