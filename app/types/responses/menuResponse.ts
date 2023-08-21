type MenuPageResponse = {
  id: number;
  path: string;
  displayName: string;
};

type IndexSectionResponse = {
  page: MenuPageResponse;
};

type SectionResponse = {
  path: string;
  displayName: string;
  pages: MenuPageResponse[];
};

type MenuResponse = {
  index: IndexSectionResponse;
  sections: SectionResponse[];
};

export {
  MenuPageResponse,
  IndexSectionResponse,
  SectionResponse,
  MenuResponse,
};
