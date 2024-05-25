// src/routes/dashboard/invoices/create/index.tsx

import { CreateForm } from "~/components/ui/invoices/create-form";
import { Breadcrumbs } from "~/components/ui/invoices/breadcrumbs";
import { fetchCustomers } from "~/lib/data";
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { createInvoice } from "~/lib/actions";

const FormSchema = z.object({
  customerId: z.string(),
  amount: z.coerce.number().max(21474836.47), // Limite maximale pour éviter de dépasser la capacité d'un integer après multiplication par 100
  status: z.enum(["pending", "paid"]),
});

export const useCreateInvoice = routeAction$(async (data, { fail }) => {
  try {
    await createInvoice(data);
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Failed to create invoice:", error);
    return fail(500, {
      message: error.message,
    });
  }
}, zod$(FormSchema));

export default component$(() => {
  const customersResource = useResource$(async () => {
    const customers = await fetchCustomers();
    return customers;
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Resource
        value={customersResource}
        onResolved={(customers) => {
          return <CreateForm customers={customers} />;
        }}
        onPending={() => null}
        onRejected={(error) => {
          console.error(error);
          return <div>Error</div>;
        }}
      />
    </main>
  );
});
