import * as THREE from 'three';
import { Component } from '../component';
import { CSSClasses } from "../ui/css-classes";

export class Minigame {

    static deltaTime = this.delta;

    now;
    delta;
    then;
    interval;
    logicFPS;
    ray = new THREE.Raycaster();

    ingameUI;

    constructor() {
        this.init();
    }

    // Controls the standard 'fade' of elements when creating a new minigame
    // Sets a reference of time, and fires Start() and Update() for children
    init() {
        this.dispatchEvent("minigameStarted");
        setTimeout(() => {
            this.start();

            // Setup logic loop
            this.now = Date.now();
            this.delta = Date.now();
            this.then = Date.now();
            this.interval = 1000 / this.logicFPS;
            this.update();
        }, 500);
    }

    // "Interface" function, as starting point for minigame extensions
    start() {}

    // "Interface" function, as the main loop for minigame extensions
    update() {}

    // Argument positions represent number keys on keyboard, called by keypress, not 0 indexed
    debug(...args) {
        args.forEach((fn, index) => {
            document.addEventListener("keypress", (e) => {
                if (e.keyCode === (49 + index)) {
                    fn();
                }
            });
        });
    }

    dispatchEvent(eventName, detail) {
        const e = new CustomEvent(eventName, {
            detail: detail
        });
        document.body.dispatchEvent(e);
    }
}