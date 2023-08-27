import scssVars from "~/assets/scss/alias.module.scss";

export const useCustomStyles = () => {
  const setPageBackgroundColor = (color: string) => {
    setRootVariable(scssVars.pageBackgroundColorVar, color);
  };

  const setPageFontColor = (color: string) => {
    setRootVariable(scssVars.pageFontColorVar, color);
  };

  const setRootVariable = (name: string, value: string) => {
    if (!document.adoptedStyleSheets[0]) {
      document.adoptedStyleSheets = [getDefaultCSSStyleSheet()];
    }

    const rule = document.adoptedStyleSheets[0].cssRules[0] as CSSStyleRule;
    rule.style.setProperty(name, value);
  };

  const getDefaultCSSStyleSheet = (): CSSStyleSheet => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(":root {}");
    return styleSheet;
  };

  return {
    setPageBackgroundColor,
    setPageFontColor,
    setRootVariable,
  };
};
