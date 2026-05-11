import {TOTAL_SCREENS} from './commonUtils';
import Animations from './Animations';
import{Subject} from 'rxjs';

export default class ScrollService {
    static scrollHandler = new ScrollService();

    static currentScreenBroadCaster = new Subject()
    static currentScreenFadeIn = new Subject()

    constructor() {
        this.prevScrollY = window.scrollY;
        window.addEventListener('scroll', this.checkCurrentScreenUnderViewport);
    }

    /* SCROLL TO HIRE ME / CONTACT ME SCREEN */
    scrollToHireMe = () => {
        let contactMeScreen = document.getElementById("Contact Me")
        if(!contactMeScreen) return;
        contactMeScreen.scrollIntoView({ behavior: "smooth"})
    }
    scrollToHome = () => {
        let hoMeScreen = document.getElementById("Home")
        if(!hoMeScreen) return;
        hoMeScreen.scrollIntoView({ behavior: "smooth"})
    }
    isElementView = (elem, type) => {
        let rec = elem.getBoundingClientRect();
        let elementTop = rec.top;
        let elementBottom = rec.bottom;

        let partiallyVissible = elementTop < window.innerHeight && elementBottom >=0;
        let completelyVissible = elementTop >=0 && elementBottom <= window.innerHeight;

        switch(type) {
            case "partial":
                return partiallyVissible;
            
            case "complete":
                return completelyVissible
                default: 
                return false 
        }
    }

    checkCurrentScreenUnderViewport = () => {
        this.prevScrollY = window.scrollY;
        let currentScreen = null;
        let minDistance = Infinity;

        for(let screen of TOTAL_SCREENS) {
            let screenFromDOM = document.getElementById(screen.screen_name);
            if(!screenFromDOM) continue;

            let partiallyVissible = this.isElementView(screenFromDOM, "partial");
            let rec = screenFromDOM.getBoundingClientRect();

            if(partiallyVissible && !screen.alreadyRendered) {
                ScrollService.currentScreenFadeIn.next({
                    fadeInScreen: screen.screen_name
                });
                screen['alreadyRendered'] = true;
            }

            // Reset when fully off-screen so the section re-animates on next visit
            if(!partiallyVissible && screen.alreadyRendered) {
                screen['alreadyRendered'] = false;
                const isAbove = rec.bottom < 0;
                Animations.animations.resetScreen(screen.screen_name, isAbove);
            }

            let distanceFromTop = Math.abs(rec.top);
            if(partiallyVissible && distanceFromTop < minDistance) {
                minDistance = distanceFromTop;
                currentScreen = screen.screen_name;
            }
        }

        if(currentScreen) {
            ScrollService.currentScreenBroadCaster.next({
                screenInView: currentScreen,
            });
        }
    }
}