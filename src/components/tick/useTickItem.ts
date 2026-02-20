import { useRotaryTimer } from '../../hooks';

export const useTickItem = (angle: number) => {
  const { size, ringWidth, tickHeight, tickWidth, tickSpaceFromRing } =
    useRotaryTimer();

  const height = tickHeight || 0;
  const width = tickWidth || 0;

  const rotateX = size / 2 + ((size - ringWidth) / 2) * Math.cos(angle);
  const rotateY = size / 2 + ((size - ringWidth) / 2) * Math.sin(angle);
  const rotationDeg = ((angle + Math.PI / 2) * 180) / Math.PI;

  const x = rotateX - width / 2;
  const y = rotateY + ringWidth / 2 + height / 2 + (tickSpaceFromRing || 0);

  return { x, y, height, width, rotationDeg, rotateX, rotateY };
};
