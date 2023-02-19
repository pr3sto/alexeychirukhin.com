export default () => ({
  loadPageStyles(pageSettings) {
    const sheet = new CSSStyleSheet();
    const styles = createCSS(pageSettings);

    sheet.replaceSync(styles);
    document.adoptedStyleSheets = [sheet];
  },
});

function createCSS(pageSettings) {
  return `
    :root {
      --styles-background-color: ${pageSettings.backgroundColor};
      --styles-font-color: ${pageSettings.fontColor};
      --styles-font-shadow: ${createTextShadow(pageSettings.fontShadowColor)};
    }
  `;
}

function createTextShadow(hexColor) {
  let css = `0px 0px 0 ${hexColor},`;
  let lastColor = hexColor;

  for (let i = 1; i <= 10; i++) {
    lastColor = offsetColor(lastColor, 7);
    css = css + `${i}px ${i}px 1px ${lastColor},`;
  }

  return css.slice(0, -1);
}

function offsetColor(hexColor, offset) {
  let { r, g, b } = convertHexToRGB(hexColor);

  // offset colors
  r = Math.max(0, r - offset);
  g = Math.max(0, g - offset);
  b = Math.max(0, b - offset);

  return convertRGBtoHex(r, g, b);
}

function convertHexToRGB(hexColor) {
  let bigint = parseInt(hexColor.replace("#", ""), 16);

  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return { r, g, b };
}

function colorToHex(color) {
  const hex = color.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function convertRGBtoHex(r, g, b) {
  return "#" + colorToHex(r) + colorToHex(g) + colorToHex(b);
}
