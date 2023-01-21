export default (_, inject) => {
  const utility = {
    disablePageScroll: () => {
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    enablePageScroll: () => {
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  };

  inject("pageUtility", utility);
};
