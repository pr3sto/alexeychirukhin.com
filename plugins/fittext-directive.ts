export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("FitText", {
    mounted(el) {
      if (!el || !el.parentElement) return;

      el._resizeObserver = initResizeObserver(el);
      el._resizeObserver.observe(el.parentElement);

      resizeText(el, el.parentElement);
    },
    beforeUnmount(el) {
      if (el._resizeObserver) {
        el._resizeObserver.disconnect();
      }
    },
  });
});

const initResizeObserver = (element: HTMLElement): ResizeObserver => {
  const el = element;

  const onResize = useThrottle(() => {
    if (el && el.parentElement) {
      resizeText(el, el.parentElement);
    }
  }, 50);

  const resizeObserver = new ResizeObserver(onResize);
  return resizeObserver;
};

const resizeText = (element: HTMLElement, elementParent: HTMLElement): void => {
  // create canvas for measureText
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  // element's font-family name
  const fontName = window
    .getComputedStyle(element, null)
    .getPropertyValue("font-family");

  const parentWidth = elementParent.getBoundingClientRect().width;

  let currentFontSize = 12;
  const maxFontSize = 128;

  let overflow = false;
  while (!overflow && currentFontSize++ < maxFontSize) {
    // mesure text width
    context.font = `${currentFontSize}px ${fontName}`;
    const width = context.measureText(element.innerHTML).width;

    overflow = width > parentWidth;
  }

  // adjust element's fontSize
  element.style.fontSize = `${currentFontSize - 1}px`;
};
