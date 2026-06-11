import IconGameOver from "../icons/IconGameOver";
import IconGameWon from "../icons/IconGameWon";

type Props = {
  status: "won" | "lost";
  onRestart: () => void;
  onChangeLevel: () => void;
};

export default function GameResult({
  status,
  onRestart,
  onChangeLevel,
}: Props) {
  const isWon = status === "won";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-10 flex flex-col items-center gap-6 shadow-2xl max-w-md w-full">
        {isWon ? <IconGameWon /> : <IconGameOver />}
        <h2 className="text-2xl font-bold text-gray-800">
          {isWon ? "آفرین! بردی!" : "باختی!"}
        </h2>
        <p className="text-gray-500 text-center">
          {isWon
            ? "تونستی همه کارت‌ها رو پیدا کنی!"
            : "وقت یا حرکت‌هات تموم شد!"}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={onRestart}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            همین سطح دوباره
          </button>
          <button
            onClick={onChangeLevel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            تغییر سطح
          </button>
        </div>
      </div>
    </div>
  );
}
