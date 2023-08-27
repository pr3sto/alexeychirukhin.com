import FastPoissonDiskSampling from "poisson-disk-sampling";

export type Position = {
  x: number;
  y: number;
};

export const useMathUtils = () => {
  const sliceRandom = <T>(array: Array<T>, numberOfItems: number): Array<T> => {
    const shuffled = useShuffle(array);
    return shuffled.slice(0, numberOfItems);
  };

  const getRandomPointsOnPlane = (
    planeWidth: number,
    planeHeight: number,
    numberOfPoints: number,
  ) => {
    // use poisson disk sampling algorithm
    const radius = Math.sqrt((planeWidth * planeHeight) / (numberOfPoints * 2));
    const pds = new FastPoissonDiskSampling({
      shape: [planeWidth, planeHeight],
      minDistance: radius,
    });
    const points = pds.fill();

    // select random points from generated array
    return sliceRandom(points, numberOfPoints);
  };

  const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const isOdd = (num: number) => {
    return num % 2;
  };

  const percentToPx = (
    pos: Position,
    width: number,
    height: number,
  ): Position => {
    return {
      x: (pos.x / 100) * width,
      y: (pos.y / 100) * height,
    };
  };

  const pxToPercent = (
    pos: Position,
    width: number,
    height: number,
  ): Position => {
    return {
      x: (pos.x / width) * 100,
      y: (pos.y / height) * 100,
    };
  };

  return {
    getRandomNumber,
    getRandomPointsOnPlane,
    isOdd,
    percentToPx,
    pxToPercent,
    sliceRandom,
  };
};
