import { useCallback, useRef, useState } from "react";

export default function useCountdownTimer(
  initialTime: number,
  onFinish: () => void,
) {
  const [timer, setTimer] = useState<number>(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onFinish]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(
    (newTime: number) => {
      stop();
      setTimer(newTime);
    },
    [stop],
  );

  const formatted = `${String(Math.floor(timer / 60)).padStart(2, "0")} : ${String(timer % 60).padStart(2, "0")}`;

  return { timer: formatted, start, stop, reset };
}
