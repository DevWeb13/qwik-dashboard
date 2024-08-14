// src/routes/dashboard/invoices/create/index.tsx

import { component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "~/components/ui/invoices/breadcrumbs";
import { CreateForm } from "~/components/ui/invoices/create-form";

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
