type PhotoCard = {
  type: string;
  photoUrl: string;
  round: boolean;
  caption?: string;
};

type DarkslideCard = {
  type: string;
  html: string;
};

type Cardstack = {
  type: string;
  cardScale: number;
  showBorder: boolean;
  cards: (PhotoCard | DarkslideCard)[];
};

type Photo = {
  type: string;
  url: string;
  width: number;
  height: number;
};

type PhotoGridSectionCols = {
  lg: number;
  sm: number;
};

type PhotoGridSection = {
  cols: PhotoGridSectionCols;
  photos: Photo[];
};

type PhotoGrid = {
  type: string;
  padding: boolean;
  sections: PhotoGridSection[];
};

type TextBlock = {
  align: string;
  linesStyle: string;
  lines: string[];
};

type TextBlocks = {
  type: string;
  blocks: TextBlock[];
};

type FadeInTransition = {
  triggerOffsetPercentage: number;
};

type Offset = {
  top: string;
  bottom: string;
  left: string;
  right: string;
};

type PageComponentStyles = {
  fadeInTransition?: FadeInTransition;
  maxHeight?: string;
  offset: Offset;
};

type PageComponent = {
  content: Cardstack | Photo | PhotoGrid | TextBlocks;
  styles: PageComponentStyles;
};

type PageStyles = {
  backgroundColor: string;
  fontColor: string;
};

type Page = {
  id: number;
  styles: PageStyles;
  components: PageComponent[];
};

export {
  PhotoCard,
  DarkslideCard,
  Cardstack,
  Photo,
  PhotoGridSectionCols,
  PhotoGridSection,
  PhotoGrid,
  TextBlock,
  TextBlocks,
  FadeInTransition,
  Offset,
  PageComponentStyles,
  PageComponent,
  PageStyles,
  Page,
};
