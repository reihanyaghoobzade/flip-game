export default function IconCardBack() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="_r_r_-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#312E81"></stop>
          <stop offset="100%" stop-color="#4C1D95"></stop>
        </linearGradient>
        <linearGradient id="_r_r_-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#22D3EE"></stop>
          <stop offset="50%" stop-color="#E879F9"></stop>
          <stop offset="100%" stop-color="#F472B6"></stop>
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="8"
        fill="url(#_r_r_-bg)"
      ></rect>
      <path
        d="M4 12h40M4 24h40M4 36h40M12 4v40M24 4v40M36 4v40"
        stroke="#6366F1"
        stroke-width="0.6"
        opacity="0.35"
      ></path>
      <circle
        cx="24"
        cy="24"
        r="11"
        stroke="url(#_r_r_-ring)"
        stroke-width="3"
      ></circle>
      <circle cx="24" cy="24" r="5" fill="#22D3EE" opacity="0.9"></circle>
      <circle cx="24" cy="24" r="2" fill="#F0F9FF"></circle>
      <path
        d="M0 -3 L0.8 -0.8 L3 0 L0.8 0.8 L0 3 L-0.8 0.8 L-3 0 L-0.8 -0.8 Z"
        fill="#FDE047"
        transform="translate(12 12) scale(0.55)"
      ></path>
      <path
        d="M0 -3 L0.8 -0.8 L3 0 L0.8 0.8 L0 3 L-0.8 0.8 L-3 0 L-0.8 -0.8 Z"
        fill="#FDE047"
        transform="translate(36 14) scale(0.5)"
      ></path>
      <path
        d="M0 -3 L0.8 -0.8 L3 0 L0.8 0.8 L0 3 L-0.8 0.8 L-3 0 L-0.8 -0.8 Z"
        fill="#FDE047"
        transform="translate(34 36) scale(0.45)"
      ></path>
    </svg>
  );
}
