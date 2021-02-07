import { TheRoyalGameOfUr } from "../minigames/ur/ur";
import { Cursor } from "../cursor";

export class Events {

    static buttonIDs = ['home'];
    static minigameIDs = ['minigameUr'];
    static entryController = '.entry__header-controller';

    // For nodes: uses element id to attach a function name of the same id + capital eventType
    static attachEvents(ids, eventType) {
        const capitalEventType = eventType[0].toUpperCase() + eventType.substr(1);
        ids.forEach(id => {
            document.getElementById(id)?.addEventListener(eventType, 
            Events[id + capitalEventType] instanceof Function 
            ? 
            Events[id + capitalEventType] 
            : 
            console.warn('No function exists of: "' + id + capitalEventType + '" in the "Events" class'));
        });

        // Entry controller click
        const controllers = document.querySelectorAll(Events.entryController);
        controllers.forEach(btn => {
            btn.addEventListener(eventType, () => {Events.headerReadMore(btn)});
        });
    }

    static attachUIClickEvents() {
        Events.attachEvents(Events.buttonIDs.concat(Events.minigameIDs), 'click');
    }

    // -- UI
    // Home button - reload, GC will collect memory
    static homeClick() { window.location.reload(); }

    // Entry header 'read more'
    static headerReadMore(node) {
        node = node.closest('.entry__header');
        const classes = Array.from(node.classList);
        classes.filter(c => !c.includes("--open")).forEach(c => {
            node.classList.toggle(c + "--open");
        });
    }

    // -- Minigames
    static minigameUrClick() { new TheRoyalGameOfUr(); }

    // -- Cursor
    static attachCursorEvents() {
        document.addEventListener('mousemove', (e) => {
            Cursor.setX(e.clientX);
            Cursor.setY(e.clientY);
        });
    }
}