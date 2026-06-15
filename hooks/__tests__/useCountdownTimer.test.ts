import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useCountdownTimer from "../useCountdownTimer";

describe("useCountdownTimer", () => {
  it("should decrease timer every second", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useCountdownTimer(5, vi.fn()));

    expect(result.current.timer).toBe("00 : 05");

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timer).toBe("00 : 04");

    vi.useRealTimers();
  });

  it("should call onFinish once when timer reaches zero", () => {
    vi.useFakeTimers();

    const onFinish = vi.fn();

    const { result } = renderHook(() => useCountdownTimer(2, onFinish));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.timer).toBe("00 : 00");

    expect(onFinish).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("should reset timer and stop countdown", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useCountdownTimer(5, vi.fn()));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.timer).toBe("00 : 03");

    act(() => {
      result.current.reset(10);
    });

    expect(result.current.timer).toBe("00 : 10");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe("00 : 10");

    vi.useRealTimers();
  });
});
