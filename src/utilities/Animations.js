export default class Animations {
    static animations = new Animations();

    fadeInScreen = (screen_name) => {
        let screen = document.getElementById(screen_name);
        if(!screen_name || !screen) return;
        // Set container visible first so the CSS transition starts
        screen.style.opacity = "1";
        screen.style.transform = "translateY(0) scale(1)";
        // Remove then force a reflow before re-adding so child CSS animations restart cleanly
        screen.classList.remove('screen-visible');
        void screen.offsetWidth;
        screen.classList.add('screen-visible');
    }

    resetScreen = (screen_name, fromAbove = false) => {
        let screen = document.getElementById(screen_name);
        if(!screen_name || !screen) return;
        // Only hide sections that use the fade-in scroll system; leave others (e.g. Home) untouched
        if(!screen.classList.contains('fade-in')) return;
        screen.style.opacity = "0";
        screen.style.transform = fromAbove
            ? "translateY(-50px) scale(0.97)"
            : "translateY(50px) scale(0.97)";
    }
}