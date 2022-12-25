export const state = () => ({
  timestamp: null,
  pages: [],
  menuSections: [],
  misc: {
    noImageUrl: null,
  },
});

export const getters = {
  currentPage: (state) => (route) => {
    return state.pages.find((page) => page.route === route);
  },
};

export const mutations = {
  setData(state, data) {
    state.misc = data.misc;

    // site pages
    state.pages = data.pages.map((page) => {
      return {
        header: page.header,
        section: page.section,
        path: page.path,
        route: page.section ? `/${page.section}/${page.path}` : `/${page.path}`,
        content: page.content,
      };
    });

    // construct menu items
    const menuItems = state.pages.map((page) => {
      return {
        header: page.header,
        section: page.section,
        route: page.route,
      };
    });

    // group menu items by section
    state.menuSections = menuItems.reduce(function (
      previousValue,
      currentValue
    ) {
      previousValue[currentValue.section] =
        previousValue[currentValue.section] || [];
      previousValue[currentValue.section].push(currentValue);
      return previousValue;
    },
    Object.create(null));

    // datetime for maintaining localstorage cache
    state.timestamp = Date.now();
  },
};
