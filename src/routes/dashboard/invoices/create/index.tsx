// src/routes/dashboard/invoices/create/index.tsx

import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/ui/invoices/breadcrumbs";
import { CreateForm } from "~/components/ui/invoices/create-form";
import { createInvoice } from "~/lib/actions";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number().positive(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export const useCreateInvoice = routeAction$(async (data) => {
  const newInvoice = await createInvoice(data);
  return {
    success: true,
    newInvoice,
  };
}, zod$(CreateInvoice));

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
