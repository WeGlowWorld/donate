export const sharePossibilities: SharePossibility[] = [
  {
    title: 'landscape',
    canvas: {
      height: 630,
      width: 1200,
    },
  },
  {
    title: 'portrait',
    canvas: {
      height: 1920,
      width: 1080,
    },
  },
  {
    title: 'square',
    canvas: {
      height: 800,
      width: 800,
    },
  },
];

export type SharePossibility = {
  title: string;
  canvas: {
    height: number;
    width: number;
  };
};
