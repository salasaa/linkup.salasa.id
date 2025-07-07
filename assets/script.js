document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  // Set initial mode from localStorage or system
  function setInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
      iconSun?.classList.add("hidden");
      iconMoon?.classList.remove("hidden");
    } else {
      html.classList.remove("dark");
      iconSun?.classList.remove("hidden");
      iconMoon?.classList.add("hidden");
    }
  }
  setInitialTheme();

  // Toggle handler
  themeToggle?.addEventListener("click", function () {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    iconSun?.classList.toggle("hidden", isDark);
    iconMoon?.classList.toggle("hidden", !isDark);
  });
});
