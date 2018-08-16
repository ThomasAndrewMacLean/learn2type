export const setupNavigation = () => {
    const toggleNavigation = (item, items, classs) => {
        item.classList.add(classs);
        items.filter(ni => ni !== item).forEach(n => n.classList.remove(classs));
    };
    const setNavigation = () => {
        const navHash = 'nav' + location.hash.replace('#/', '');
        const el = document.getElementById(navHash);
        if (el) {
            toggleNavigation(el, navItems, 'active');
        }
        const mainHash = 'main' + location.hash.replace('#/', '');
        const elMain = document.getElementById(mainHash);
        if (elMain) {
            toggleNavigation(elMain, mainItems, 'show');
        }
    };
    const navLearn2Type = document.getElementById('navLearn2Type');
    const navHighScores = document.getElementById('navHighScores');
    const navItems = [navLearn2Type, navHighScores];

    const mainLearn2Type = document.getElementById('mainLearn2Type');
    const mainHighScores = document.getElementById('mainHighScores');
    const mainItems = [mainLearn2Type, mainHighScores];

    //set initial navigation
    setNavigation();

    window.onhashchange = () => {
        setNavigation();
    };
};
