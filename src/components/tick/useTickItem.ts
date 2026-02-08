import useRotaryTimer from '../../hooks/useRotaryTimer';

const TICKS_CONFIG = {
  width: 1,
  height: 4,
  extraHeight: 5,
} as const;

const useTickItem = (angle: number) => {
  const { size, ringWidth, tickHeight, tickWidth, tickSpaceFromRing } =
    useRotaryTimer();

  const rotateX = size / 2 + ((size - ringWidth) / 2) * Math.cos(angle);
  const rotateY = size / 2 + ((size - ringWidth) / 2) * Math.sin(angle);
  const rotationDeg = ((angle + Math.PI / 2) * 180) / Math.PI;

  const x = rotateX - TICKS_CONFIG.width / 2;
  const y =
    rotateY -
    TICKS_CONFIG.height / 2 +
    ringWidth / 2 +
    TICKS_CONFIG.height / 2 +
    (tickSpaceFromRing || 0);

  const height = tickHeight || 0;

  const width = tickWidth || 0;

  return { x, y, height, width, rotationDeg, rotateX, rotateY };
};

export default useTickItem;
