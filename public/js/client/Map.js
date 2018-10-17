import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export default class Map extends AbstractDispatcher {
    
    constructor() {
        super();

        this.map = document.querySelector('.map-wrp .svg');

        this.handlePathClick(this.getPaths());
        this.initZoomHandler();

        this.clearHighlight = this.clearHighlight.bind(this);
    }

    getMapName(name) {
        document.querySelector('[data-ui="map-name"]').innerHTML = name;
    }
    
    getPaths() {
        return this.map.querySelectorAll('path');
    }
    
    handlePathClick(paths) {
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            path.addEventListener('click', e => {
                if (e.currentTarget.classList.contains('active')) return;
                this.clearHighlight();
                e.currentTarget.classList.add('active');
                this.dispatch({ type: EventType.CLICK, el: e.currentTarget });
            }); 
        }
    }

    clearHighlight() {
        const activeEls = this.map.querySelectorAll('.active');
        for (let i = 0; i < activeEls.length; i++) {
            activeEls[i].classList.remove('active');
        }
    }

    initZoomHandler() {
        const panZoomMap = window.svgPanZoom(this.map)
    }

    placeElements(data) {
        data.forEach(employee => {
            this.dispatch({type: EventType.ADD_EMPLOYEE, data: employee });
        });
    }
}