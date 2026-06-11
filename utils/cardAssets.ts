export const CARD_IMAGE_COUNT = 32;

export function cardImageSrc(pairId: number): string {
  const index = ((pairId - 1) % CARD_IMAGE_COUNT) + 1;
  return `/cards/${String(index).padStart(2, "0")}.jpg`;
}
