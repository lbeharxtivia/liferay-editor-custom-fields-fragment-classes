/**
 * Scans document stylesheets for classes starting with "fragment-style",
 * filtering out common system/library stylesheets.
 */
export const getClassesFromStyles = (): string[] => {
  const fragmentClasses = new Set<string>();
  
  const excluded: string[] = [
    "product-navigation-product-menu-web", "clay", "aui", "portal-search",
    "product-navigation", "site-navigation", "fonts", "alloy", 
    "js-components-web", "css-admin-web", "reports-web", 
    "frontend-editor", "layout-content"
  ];

  // document.styleSheets is a StyleSheetList, not an Array
  const sheets = Array.from(document.styleSheets) as CSSStyleSheet[];

  for (const sheet of sheets) {
    try {
      const href: string = sheet.href || "";
      const isExcluded: boolean = excluded.some(term => href.includes(term));
      
      if (isExcluded) continue;

      // cssRules can be null if the stylesheet is empty or protected
      const rules = (sheet.cssRules || sheet.rules) as CSSRuleList | null;
      if (!rules) continue;

      for (const rule of Array.from(rules)) {
        // Check if the rule is a standard Style rule (type 1)
        if (rule instanceof CSSStyleRule && rule.selectorText) {
          const matches = rule.selectorText.match(/\.fragment-style[a-zA-Z0-9_-]*/g);
          
          if (matches) {
            for (const cls of matches) {
              fragmentClasses.add(cls.replace('.fragment-style-', ''));
            }
          }
        }
      }
    } catch (e) {
      // Log security/CORS errors as warnings
      console.warn(`Could not access stylesheet: ${sheet.href}`, (e as Error).message);
    }
  }

  return Array.from(fragmentClasses);
};