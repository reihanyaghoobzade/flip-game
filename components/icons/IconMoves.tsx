export default function IconMoves({size = 24} : {size?: number}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="_R_2tr5_-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38BDF8"></stop>
          <stop offset="100%" stop-color="#A855F7"></stop>
        </linearGradient>
        <linearGradient id="_R_2tr5_-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#22D3EE"></stop>
          <stop offset="100%" stop-color="#E879F9"></stop>
        </linearGradient>
      </defs>
      <rect
        x="7"
        y="16"
        width="15"
        height="21"
        rx="3.5"
        fill="#4338CA"
        transform="rotate(-14 14.5 26.5)"
      ></rect>
      <path
        d="M11 22h7M11 26h5"
        stroke="#A5B4FC"
        stroke-width="1.5"
        stroke-linecap="round"
        transform="rotate(-14 14.5 26.5)"
      ></path>
      <rect
        x="26"
        y="14"
        width="15"
        height="21"
        rx="3.5"
        fill="url(#_R_2tr5_-face)"
        transform="rotate(12 33.5 24.5)"
      ></rect>
      <circle cx="33" cy="23" r="4" fill="#FFF" opacity="0.85"></circle>
      <path
        d="M20 11c3-4 8-4 11 0"
        stroke="url(#_R_2tr5_-arc)"
        stroke-width="2.5"
        stroke-linecap="round"
      ></path>
      <path
        d="M29 9l2 2-2 2"
        stroke="#E879F9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M28 37c-3 4-8 4-11 0"
        stroke="url(#_R_2tr5_-arc)"
        stroke-width="2.5"
        stroke-linecap="round"
      ></path>
      <path
        d="M19 39l-2-2 2-2"
        stroke="#22D3EE"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
}
