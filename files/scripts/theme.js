/*
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) { return localStorageTheme; }
    if (systemSettingDark.matches) { return "dark"; }

    return "light";
}

function updateButton({ buttonEl, isDark }) {
    document.getElementById("sun-icon").style.opacity = isDark ? "1" : "0";
    document.getElementById("moon-icon").style.opacity = isDark ? "0" : "1";
}

function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
});