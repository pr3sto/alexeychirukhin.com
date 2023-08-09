let menu;

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
    return await pageService.getPageAsync(menu.currentPage.id);
  },
  getCurrentPagePhotoUrls() {
    return pageService.getPagePhotoUrls(menu.currentPage.id);
  },
  getCurrentPageDisplayName() {
    return menu.currentPage.displayName;
  }
});
