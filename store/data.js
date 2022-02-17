export const state = () => ({
  created: null,
  pages: [],
  menu: []
})

export const mutations = {
  setData(state, data) {
    // site pages
    state.pages = data.pages;

    // construct menu items
    var menuItems = data.pages.map((page) => {
      return {
        menuItemText: page.menuItemText,
        menuItemSection: page.menuItemSection,
        route: page.route
      };
    });

    // group menu items by section
    state.menu = menuItems.reduce(function (previousValue, currentValue) {
      previousValue[currentValue.menuItemSection] = previousValue[currentValue.menuItemSection] || [];
      previousValue[currentValue.menuItemSection].push(currentValue);
      return previousValue;
    }, Object.create(null));

    // datetime for maintaining localstorage cache
    state.created = Date.now();
  }
}
