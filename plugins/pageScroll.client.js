export default (_, inject) => {
  inject("disablePageScroll", () => {
    document.body.classList.add("non-scrollable");
    document.documentElement.classList.add("non-scrollable");
  });
  inject("enablePageScroll", () => {
    document.body.classList.remove("non-scrollable");
    document.documentElement.classList.remove("non-scrollable");
  });
};
