let currentMenu;
let pages = {};

export default (menuService, pageService) => ({
  async initializeAsync() {
    await menuService.loadToStoreAsync();
  },
  nextRoute(route) {
    if (!menuService.hasRoute(route)) {
      throw Error("INVALID ROUTE");
    }

    currentMenu = menuService.getMenuByRoute(route);

    if (!currentMenu || !currentMenu.currentPage) {
      throw Error("INVALID MENU");
    }
  },
  getCurrentMenu() {
    return currentMenu;
  },
  getCurrentMenuPage() {
    return currentMenu.currentPage;
  },
  async getCurrentPageAsync() {
    const pageId = currentMenu.currentPage.id;

    if (pages[pageId] && pages[pageId].data) {
      return pages[pageId].data;
    }

    pages[pageId] = await pageService.getPageAsync(pageId);
    return pages[pageId].data;
  },
  getCurrentPagePhotos() {
    const pageId = currentMenu.currentPage.id;

    if (pages[pageId] && pages[pageId].photos) {
      return pages[pageId].photos;
    }

    return [];
  },
  getCurrentPageDisplayName() {
    return currentMenu.currentPage.displayName;
  },
});
