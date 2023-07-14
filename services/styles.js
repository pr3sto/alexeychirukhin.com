import * as scssVars from "~/assets/scss/_variables.scss";

export default function () {
  document.adoptedStyleSheets = [getCSSStyleSheet()];
  return {
    applyPageStyles(pageStyles) {
      this.setRootVariable(
        scssVars.varPageBackgroundColor,
        pageStyles.backgroundColor
      );
      this.setRootVariable(scssVars.varPageFontColor, pageStyles.fontColor);
      this.setRootVariable(
        scssVars.varPageHeaderShadow,
        createTextShadow(pageStyles.fontColor, 7)
      );
    },
    setRootVariable(name, value) {
      if (
        document.adoptedStyleSheets[0] &&
        document.adoptedStyleSheets[0].cssRules
      ) {
        document.adoptedStyleSheets[0].cssRules[0].style.setProperty(
          name,
          value
        );
      }
    },
  };
}

function getCSSStyleSheet() {
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(":root {}");
  return styleSheet;
}

function createTextShadow(hexColor, steps) {
  let css = "";
  for (let i = 0; i <= steps; i++) {
    hexColor = offsetColor(hexColor, 9);
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
