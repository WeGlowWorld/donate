export const sharePossibilities: SharePossibility[] = [
  {
    title: 'fb',
    canvas: {
      height: 630,
      width: 1200,
    },
    bg: '',
  },
  {
    title: 'igPost',
    canvas: {
      height: 800,
      width: 800,
    },
    bg: '',
  },
  {
    title: 'igStory',
    canvas: {
      height: 1280,
      width: 720,
    },
    bg: '',
  },
  {
    title: 'li',
    canvas: {
      height: 627,
      width: 1200,
    },
    bg: '',
  },
  {
    title: 'wa',
    canvas: {
      height: 800,
      width: 800,
    },
    bg: '',
  },
];

export type SharePossibility = {
  title: string;
  canvas: {
    height: number;
    width: number;
  };
  bg: string;
};
