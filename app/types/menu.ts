type MenuPage = {
  id: number;
  path: string;
  displayName: string;
  route: string;
};

type IndexSection = {
  page: MenuPage;
};

type Section = {
  path: string;
  displayName: string;
  pages: MenuPage[];
};

type Menu = {
  index: IndexSection;
  sections: Section[];
};

export { MenuPage, IndexSection, Section, Menu };
