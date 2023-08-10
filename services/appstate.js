let menu;
let pages = {};

export default (menuService, pageService) => ({
  async initializeAsync() {
    await menuService.loadToStoreAsync();
  },
  nextRoute(route) {
    if (!menuService.hasRoute(route)) {
      throw Error("INVALID ROUTE");
    }

    menu = menuService.getMenuByRoute(route);

    if (!menu || !menu.currentPage) {
      throw Error("INVALID MENU");
    }
  },
  getCurrentMenu() {
    return menu;
  },
  getCurrentMenuPage() {
    return menu.currentPage;
  },
  async getCurrentPageAsync() {
    const pageId = menu.currentPage.id;

    if (pages[pageId] && pages[pageId].data) {
      return pages[pageId].data;
    }

    pages[pageId] = await pageService.getPageAsync(pageId);
    return pages[pageId].data;
  },
  getCurrentPagePhotos() {
    const pageId = menu.currentPage.id;

    if (pages[pageId] && pages[pageId].photos) {
      return pages[pageId].photos;
    }

    return [];
  },
  getCurrentPageDisplayName() {
    return menu.currentPage.displayName;
  },
});
