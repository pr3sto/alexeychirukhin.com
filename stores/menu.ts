import { defineStore } from "pinia";
import { Menu, MenuPage } from "~/app/types/menu";

export const useMenuStore = defineStore("menu", () => {
  // state
  const menu = ref<Menu>();

  // actions
  const setData = (menuData: Menu): void => {
    menu.value = menuData;
  };

  // getters
  const indexMenuPage = computed((): MenuPage | undefined => {
    return menu.value?.index.page;
  });

  const getSectionMenuPage = computed(
    () =>
      (section: string, page: string): MenuPage | undefined => {
        return menu.value?.sections
          .find((s) => s.path === section)
          ?.pages.find((p) => p.path === page);
      },
  );

  return {
    menu,
    setData,
    indexMenuPage,
    getSectionMenuPage,
  };
});
