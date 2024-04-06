import { component$ } from "@builder.io/qwik";

interface HiArrowRightOutlineProps {
  style?: string;
}

export const HiArrowRightOutline = component$<HiArrowRightOutlineProps>(
  ({ style = "h-6 w-6" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class={style}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    );
  },
);
