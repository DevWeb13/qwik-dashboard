import {
  HiArrowLeftOutline,
  HiArrowRightOutline,
} from "@qwikest/icons/heroicons";
import { Link } from "@builder.io/qwik-city";
// import { generatePagination } from "~/lib/utils";
import { component$ } from "@builder.io/qwik";

export const Pagination = component$(
  ({ totalPages }: { totalPages: number }) => {
    // NOTE: comment in this code when you get to this point in the course

    // const allPages = generatePagination(currentPage, totalPages);

    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}

        {/* <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div> */}
      </>
    );
  },
);

const PaginationNumber = component$(
  ({
    page,
    href,
    isActive,
    position,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className =
      "flex h-10 w-10 items-center justify-center text-sm border" +
      " " +
      (position === "first" || position === "single" ? "rounded-l-md" : "") +
      " " +
      (position === "last" || position === "single" ? "rounded-r-md" : "") +
      " " +
      (isActive ? "z-10 bg-blue-600 border-blue-600 text-white" : "") +
      " " +
      (!isActive && position !== "middle" ? "hover:bg-gray-100" : "") +
      " " +
      (position === "middle" ? "text-gray-300" : "");

    return isActive || position === "middle" ? (
      <div class={className}>{page}</div>
    ) : (
      <Link href={href} class={className}>
        {page}
      </Link>
    );
  },
);

const PaginationArrow = component$(
  ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = `flex h-10 w-10 items-center justify-center rounded-md border ${
      isDisabled ? "pointer-events-none text-gray-300" : "hover:bg-gray-100"
    } ${direction === "left" ? "mr-2 md:mr-4" : "ml-2 md:ml-4"}`;

    const icon =
      direction === "left" ? (
        <HiArrowLeftOutline class="w-4" />
      ) : (
        <HiArrowRightOutline class="w-4" />
      );

    return isDisabled ? (
      <div class={className}>{icon}</div>
    ) : (
      <Link class={className} href={href}>
        {icon}
      </Link>
    );
  },
);
