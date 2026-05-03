/**
 * Forces a YouTube / external link to open in a new tab, even when the page
 * is rendered inside a sandboxed iframe (e.g. the Lovable in-app preview)
 * where the default target="_blank" navigation can be silently blocked.
 *
 * The anchor still renders as a real <a href target="_blank" rel> tag, so
 * search engines and middle-click / right-click "open in new tab" continue
 * to work normally.
 */
export function openExternalLink(
  e: React.MouseEvent<HTMLAnchorElement>,
  url: string,
) {
  // Allow modifier-clicks (cmd/ctrl/shift/middle) to use native behavior.
  if (e.defaultPrevented) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
    return;
  }
  e.preventDefault();
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  // Last-resort fallback: if popup was blocked, navigate the top window.
  if (!win) {
    try {
      window.top!.location.href = url;
    } catch {
      window.location.href = url;
    }
  }
}
