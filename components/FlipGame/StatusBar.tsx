import IconClock from "../icons/IconClock";
import IconMoves from "../icons/IconMoves";

interface Props {
  timer: string;
  moves: number;
}

export default function StatusBar({ timer, moves }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6 px-4 space-y-3">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 font-bold px-6 py-2 rounded-xl text-lg tabular-nums">
          <IconClock size={26} />
          <div className="ltr">{timer}</div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 font-bold px-6 py-2 rounded-xl text-lg">
          <IconMoves size={26} />
          {moves} حرکت
        </div>
      </div>
    </div>
  );
}
