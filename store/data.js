const defaultState = {
  timestamp: null,
  pages: [],
  menu: {
    sections: [],
  },
  misc: {
    noImageUrl: null,
  },
};

export const state = () => defaultState;

export const mutations = {
  setData(state, data) {
    Object.assign(state, defaultState);

    state.misc = data.misc;

    // site pages
    state.pages = data.pages.map((page) => {
      return {
        header: page.header,
        section: page.section,
        path: page.path,
        route: page.section ? `/${page.section}/${page.path}` : `/${page.path}`,
        components: page.components,
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
    state.menu.sections = menuItems.reduce(function (
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
