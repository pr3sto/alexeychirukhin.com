export const state = () => ({
  timestamp: null,
  pages: [],
  menuSections: [],
  misc: {},
  isSmallScreen: false,
})

export const getters = {
  currentPage: (state) => (route) => {
    return state.pages.find(
      (page) => page.route === route
    );
  },
  currentMenuItemText: (state) => (route) => {
    return state.pages.find(
      (page) => page.route === route
    ).menuItemText;
  }
}

export const mutations = {
  setData(state, data) {
    state.misc = data.misc;

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
    state.menuSections = menuItems.reduce(function (previousValue, currentValue) {
      previousValue[currentValue.menuItemSection] = previousValue[currentValue.menuItemSection] || [];
      previousValue[currentValue.menuItemSection].push(currentValue);
      return previousValue;
    }, Object.create(null));

    // datetime for maintaining localstorage cache
    state.timestamp = Date.now();
  },
  setSmallScreen(state, isSmallScreen) {
    state.isSmallScreen = isSmallScreen;
  }
}
