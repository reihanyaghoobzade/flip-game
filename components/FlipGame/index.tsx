import { LEVELS, type Card, type Level } from "../../configs/game.config";
import useFlipGame from "../../hooks/useFlipGame";
import FlipCard from "./FlipCard";
import GameResult from "./GameResult";
import StatusBar from "./StatusBar";

export default function FlipGame({
  level,
  onChangeLevel,
}: {
  level: Level;
  onChangeLevel: () => void;
}) {
  const { grid } = LEVELS[level];
  const {
    cards,
    moves,
    timer,
    status,
    isLocked,
    isPreview,
    onClickCard,
    restart,
  } = useFlipGame(level);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-700 mb-6">
        بازی کارت حافظه
      </h1>

      <StatusBar timer={timer} moves={moves} />

      <div
        className="grid gap-3 w-full max-w-2xl"
        style={{
          gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card: Card) => {
          const interactive =
            !isPreview && !isLocked && !card.match && !card.flipped;

          return (
            <FlipCard
              key={card.id}
              src={card.src}
              flipped={card.flipped || isPreview}
              match={card.match}
              interactive={interactive}
              onClick={() => onClickCard(card.id)}
            />
          );
        })}
      </div>

      <p className="mt-6 text-gray-400 text-sm h-4">
        {status === "idle" &&
          !isPreview &&
          "روی یه کارت کلیک کن تا بازی شروع بشه"}
      </p>

      {(status === "won" || status === "lost") && (
        <GameResult
          status={status}
          onRestart={restart}
          onChangeLevel={onChangeLevel}
        />
      )}
    </div>
  );
}
