import AbstractDispatcher from "./AbstractDispatcher.js";

export default class Map extends AbstractDispatcher {
    
    constructor() {
        super();

        this.map = document.querySelector('.map-wrp .svg');
        // this.defaultViewBox = this.map.getAttribute('viewBox');
        // this.activeViewBox = this.defaultViewBox;
        this.tl = new TimelineMax();
        this.zoomConfig = {
            in: 0.9, 
            out: 1.1
        }

        this.handlePathClick(this.getPaths());
        this.initZoomHandler();

        this.addListener('DATA_LOADED', this.placeElements);
    }
    
    getPaths() {
        return this.map.querySelectorAll('path');
    }
    
    handlePathClick(paths) {
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            path.addEventListener('click', e => {
                console.log('click on path', e.currentTarget)
                this.dispatch({ type: 'ADD_DESK', el: e.currentTarget });

                let id = e.currentTarget.id;
                document.querySelector('.number').innerHTML = id;
                e.currentTarget.classList.toggle('active');

            }); 
        }
    }

    initZoomHandler() {
        const panZoomMap = window.svgPanZoom(this.map)
    }

    placeElements(data) {
        console.log(data.locations, data.mapName);
        let locations = data.locations;

        for (const location in locations) {
            if (locations.hasOwnProperty(location)) {
                const element = locations[location];
                console.log(element);
            }
        }
    }
}