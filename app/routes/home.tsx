import { useState } from "react";
import Setup from "../../components/FlipGame/Setup";
import type { Route } from "./+types/home";
import type { Level } from "../../configs/game.config";
import FlipGame from "../../components/FlipGame";

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

  if (!level) {
    return <Setup onStart={setLevel} />;
  }

  return <FlipGame level={level} onChangeLevel={() => setLevel(null)} />;
}
