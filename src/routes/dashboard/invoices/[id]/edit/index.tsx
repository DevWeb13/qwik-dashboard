// import Form from '@/app/ui/invoices/edit-form';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

// export default async function Page() {
//   return (
//     <main>
//       <Breadcrumbs
//         breadcrumbs={[
//           { label: 'Invoices', href: '/dashboard/invoices' },
//           {
//             label: 'Edit Invoice',
//             href: `/dashboard/invoices/${id}/edit`,
//             active: true,
//           },
//         ]}
//       />
//       <Form invoice={invoice} customers={customers} />
//     </main>
//   );
// }

import { Resource, component$, useResource$ } from "@builder.io/qwik";

import { Breadcrumbs } from "~/components/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "~/lib/data";
import { routeAction$, useLocation, z, zod$ } from "@builder.io/qwik-city";
import { updateInvoice } from "~/lib/actions";
import { EditInvoiceForm } from "~/components/ui/invoices/edit-form";

const FormSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string(),
  amount: z.coerce.number().max(21474836.47), // Limite maximale pour éviter de dépasser la capacité d'un integer après multiplication par 100
  status: z.enum(["pending", "paid"]),
});

export const useUpdateInvoice = routeAction$(async (data, { fail }) => {
  console.log("data1", data);
  try {
    await updateInvoice(data);
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Failed to update invoice:", error);
    return fail(500, {
      message: error.message,
    });
  }
}, zod$(FormSchema));

export default component$(() => {
  const loc = useLocation();
  const id = loc.params.id;

  const dataComponentResource = useResource$(async () => {
    return await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Resource
        value={dataComponentResource}
        onResolved={(data) => {
          console.log("data", data);
          const [invoice, customers] = data;
          console.log("invoice", invoice);
          return <EditInvoiceForm invoice={invoice} customers={customers} />;
        }}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>Error: {error.message}</div>}
      />
    </main>
  );
});
