type MenuPage = {
  id: number;
  path: string;
  displayName: string;
};

type MenuIndexSection = {
  page: MenuPage;
};

type MenuSection = {
  path: string;
  displayName: string;
  pages: MenuPage[];
};

type Menu = {
  index: MenuIndexSection;
  sections: MenuSection[];
};

export { MenuPage, MenuIndexSection, MenuSection, Menu };
