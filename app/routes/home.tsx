import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flip Game" },
    {
      name: "description",
      content:
        "Challenge your memory with this fun card matching game. Flip cards, find matching pairs, improve concentration, and beat your best score.",
    },
  ];
}

export default function Home() {
  return <div>بازی کارت حافظه</div>;
}
