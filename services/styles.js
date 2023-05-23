export default () => ({
  applyPageStyles(pageStyle) {
    const sheet = new CSSStyleSheet();
    const styles = createCSS(pageStyle);

    sheet.replaceSync(styles);
    document.adoptedStyleSheets = [sheet];
  },
});

function createCSS(pageStyle) {
  return `
    :root {
      --styles-background-color: ${pageStyle.backgroundColor};
      --styles-font-color: ${pageStyle.fontColor};
      --styles-font-shadow: ${createTextShadow(pageStyle.fontColor, 10)};
    }
  `;
}

function createTextShadow(hexColor, steps) {
  let css = "";
  for (let i = 0; i <= steps; i++) {
    hexColor = offsetColor(hexColor, 8);
    css = css + `${i}px ${i}px 1px ${hexColor},`;
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
  const bigint = parseInt(hexColor.replace("#", ""), 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function colorToHex(color) {
  const hex = color.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function convertRGBtoHex(r, g, b) {
  return "#" + colorToHex(r) + colorToHex(g) + colorToHex(b);
}
