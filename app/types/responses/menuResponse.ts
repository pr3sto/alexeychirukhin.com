type MenuPageResponse = {
  id: number;
  path: string;
  displayName: string;
};

type MenuIndexSectionResponse = {
  page: MenuPageResponse;
};

type MenuSectionResponse = {
  path: string;
  displayName: string;
  pages: MenuPageResponse[];
};

type MenuResponse = {
  index: MenuIndexSectionResponse;
  sections: MenuSectionResponse[];
};

export {
  MenuPageResponse,
  MenuIndexSectionResponse,
  MenuSectionResponse,
  MenuResponse,
};
