// Applies a stored theme choice before first paint so the page does not flash
// in the other theme. Without a stored choice the CSS follows the OS setting.
// Key and values must match ThemeService (src/app/services/theme.service.ts).
try {
  var theme = localStorage.getItem('gt-theme');
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  }
} catch (e) {
  // Storage blocked: fall back to the OS setting
}
