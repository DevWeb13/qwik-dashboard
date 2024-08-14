// src/routes/dashboard/invoices/create/index.tsx

import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/ui/invoices/breadcrumbs";
import { CreateForm } from "~/components/ui/invoices/create-form";
import { createInvoice } from "~/lib/actions";

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
});

export default component$(() => {
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
      <CreateForm />
    </main>
  );
});
