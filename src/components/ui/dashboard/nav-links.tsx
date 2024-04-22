// src/components/ui/dashboard/nav-links.tsx

import { component$ } from "@builder.io/qwik";

import {
  HiUserGroupOutline,
  HiHomeOutline,
  HiDocumentDuplicateOutline,
} from "@qwikest/icons/heroicons";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HiHomeOutline },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: HiDocumentDuplicateOutline,
  },
  { name: "Customers", href: "/dashboard/customers", icon: HiUserGroupOutline },
];

export const NavLinks = component$(() => {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            class="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon class="w-6" />
            <p class="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
});
