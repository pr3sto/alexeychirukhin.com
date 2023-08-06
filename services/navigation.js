let currentMenu;
let currentMenuPage;

export default (menuService, pageService) => ({
  async initializeAsync() {
    await menuService.loadToStoreAsync();
  },
  navigate(route) {
    if (!menuService.hasRoute(route)) {
      throw Error("INVALID ROUTE");
    }

    currentMenu = menuService.getMenuByRoute(route);
    currentMenuPage = currentMenu.currentPage;
  },
  getCurrentMenu() {
    return currentMenu;
  },
  getCurrentMenuPage() {
    return currentMenuPage;
  },
  async getCurrentPageAsync() {
    return await pageService.getPageAsync(currentMenuPage.id);
  },
});
