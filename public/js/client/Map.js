import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export default class Map extends AbstractDispatcher {
    
    constructor() {
        super();

        this.map = document.querySelector('.map-wrp .svg');

        this.handlePathClick(this.getPaths());
        this.initZoomHandler();
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
                const activeEl = this.map.querySelector('.active');
                if (activeEl && (activeEl !== e.currentTarget)) {
                    activeEl.classList.remove('active');
                }
                e.currentTarget.classList.toggle('active');


                let isActive = e.currentTarget.classList.contains('active');
                this.dispatch({ type: EventType.CLICK, el: e.currentTarget, isActive: isActive });
            }); 
        }
    }

    initZoomHandler() {
        const panZoomMap = window.svgPanZoom(this.map)
    }

    placeElements(data) {
        data.forEach(employee => {
            console.log(employee);
            this.dispatch({type: EventType.ADD_DESK, data: employee });
        });
        // let locations = data.locations;

        // for (const location in locations) {
        //     if (locations.hasOwnProperty(location)) {
        //         const data = locations[location];
        //         this.dispatch({type: EventType.ADD_DESK, data: data });
        //     }
        // }
    }
}