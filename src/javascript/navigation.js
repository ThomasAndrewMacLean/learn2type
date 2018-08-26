import { stopGame } from './index';
const navLearn2Type = document.getElementById('navLearn2Type');
const navHighScores = document.getElementById('navHighScores');
const navItems = [navLearn2Type, navHighScores];

const mainLearn2Type = document.getElementById('mainLearn2Type');
const mainHighScores = document.getElementById('mainHighScores');
const mainItems = [mainLearn2Type, mainHighScores];
const url = 'https://c4sf7djhcl.execute-api.eu-west-1.amazonaws.com/latest';

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

        if (navHash === 'navHighScores') {
            document.getElementById('putHighScoresHere').innerHTML = null;
            fetch(url + '/highscores')
                .then(x => x.json())
                .then(res => {
                    console.log(res);
                    res
                        .sort((a, b) => {
                            return a.score < b.score;
                        })
                        .map(r => {
                            const newEl = document.createElement('div');
                            newEl.innerText = `${r.name}: ${r.score}`;
                            newEl.classList.add('scoreListItem');
                            document.getElementById('putHighScoresHere').appendChild(newEl);
                            //putHighScoresHere
                        });
                });
        }
    };

    //set initial navigation
    setNavigation();

    window.onhashchange = () => {
        setNavigation();
        stopGame();
    };
};
