// src/components/ui/search.tsx

import { component$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { HiMagnifyingGlassOutline } from "@qwikest/icons/heroicons";
import { useDebouncer } from "~/hooks/useDebouncer";

export const Search = component$(({ placeholder }: { placeholder: string }) => {
  const loc = useLocation();
  const searchParams = loc.url.searchParams;
  const pathname = loc.url.pathname;
  const nav = useNavigate();

  const handleSearch = $(function handleSearch(term: string) {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      params.delete("page");
    }
    nav(`${pathname}?${params.toString()}`, { replaceState: true });
  });

  const debouncedSearch = useDebouncer(handleSearch, 300);

  return (
    <div class="relative flex flex-1 flex-shrink-0">
      <label for="search" class="sr-only">
        Search
      </label>
      <input
        class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onInput$={(e) => {
          const inputValue = (e.target as HTMLInputElement).value;
          debouncedSearch(inputValue);
        }}
        value={loc.url.searchParams.get("query")?.toString()}
      />
      <HiMagnifyingGlassOutline class="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
});
