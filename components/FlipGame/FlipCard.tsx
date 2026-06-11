import IconCardBack from "../icons/IconCardBack";

type Props = {
  src: string;
  flipped?: boolean;
  match: boolean;
  onClick?: () => void;
  interactive: boolean;
};

export default function FlipCard({
  src,
  flipped,
  match,
  onClick,
  interactive,
}: Props) {
  return (
    <button
      type="button"
      className={`w-full aspect-square rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-transform ${
        interactive
          ? "cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          : "cursor-default"
      }`}
      style={{ perspective: "1000px" }}
      onClick={interactive ? onClick : undefined}
      aria-pressed={flipped || match}
      aria-disabled={!interactive}
      aria-label="کارت بازی"
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped || match ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-inner border-4 transition-colors duration-200 border-transparent"
          style={{ backfaceVisibility: "hidden" }}
        >
          <IconCardBack />
        </div>

        <div
          className={`absolute inset-0 rounded-xl overflow-hidden border-4 transition-colors duration-200${match ? " border-green-400" : " border-transparent"}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
    </button>
  );
}
