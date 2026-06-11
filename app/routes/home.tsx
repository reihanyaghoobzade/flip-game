import { useState } from "react";
import GameSetup from "../../components/GameSetup";
import type { Route } from "./+types/home";
import type { Level } from "../../configs/game.config";

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
  const [level, setLevel] = useState<Level | null>(null);

  return (
    <div>
      <GameSetup onStart={setLevel} />
    </div>
  );
}
