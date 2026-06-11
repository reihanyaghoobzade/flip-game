import { LEVELS, type Level } from "../../configs/game.config";
import IconClock from "../icons/IconClock";
import IconGrid from "../icons/IconGrid";
import IconLevelEasy from "../icons/IconLevelEasy";
import IconLevelHard from "../icons/IconLevelHard";
import IconLevelMedium from "../icons/IconLevelMedium";
import IconMoves from "../icons/IconMoves";

type Props = {
  onStart: (level: Level) => void;
};

export default function GameSetup({ onStart }: Props) {
  const levelIcon = (level: string) => {
    switch (level) {
      case "easy":
        return <IconLevelEasy />;
      case "medium":
        return <IconLevelMedium />;
      case "hard":
        return <IconLevelHard />;
      default:
        return <IconLevelEasy />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-700">
        بازی کارت حافظه
      </h1>
      <p className="text-gray-500">سطح بازی را انتخاب کنید</p>

      <div className="flex gap-4 flex-wrap justify-center">
        {Object.entries(LEVELS).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onStart(key as Level)}
            className="bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-400 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md min-w-36"
          >
            {levelIcon(key)}
            <span className="font-bold text-indigo-700">{value.label}</span>
            <div className="flex flex-col items-center gap-1.5">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <span className="shrink-0">
                  <IconMoves />
                </span>
                {value.moves} حرکت
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <span className="shrink-0">
                  <IconClock />
                </span>
                {value.time} ثانیه
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <span className="shrink-0">
                  <IconGrid />
                </span>
                {value.grid}×{value.grid}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
