import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface BreadCrumbProps {
  breadcrumbs: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export const Breadcrumbs = component$<BreadCrumbProps>(({ breadcrumbs }) => {
  return (
    <nav aria-label="Breadcrumb" class="mb-6 block">
      <ol class="lusitana flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            class={breadcrumb.active ? "text-gray-900" : "text-gray-500"}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span class="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
});
