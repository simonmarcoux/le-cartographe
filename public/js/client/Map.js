import AbstractDispatcher from "./AbstractDispatcher.js";

export default class Map extends AbstractDispatcher {
    
    constructor() {
        super();

        this.map = document.querySelector('.map-wrp svg');
        this.defaultViewBox = this.map.getAttribute('viewBox');
        this.activeViewBox = this.defaultViewBox;
        this.tl = new TimelineMax();
        this.zoomConfig = {
            in: 0.9, 
            out: 1.1
        }

        this.handlePathClick(this.getPaths());
        this.handleZoom();
    }
    
    getPaths() {
        return document.querySelectorAll('path');
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

    handleZoom() {
        // inspiration -> https://codepen.io/PointC/pen/XbqBmM
        const zoomInBtn = document.querySelector('[data-ui="zoom-in"]');
        const zoomOutBtn = document.querySelector('[data-ui="zoom-out"]');
        

        zoomInBtn.addEventListener('click', () => {
            this.zoom('zoomin');
        });

        zoomOutBtn.addEventListener('click', () => {
            this.zoom('zoomout');
        });
    }

    calculateZoom(direction) {
        let valuesArr = this.defaultViewBox.split(" ");
        let newValues = [];
        let zoomValue = direction === 'zoomin' ? this.zoomConfig.in : this.zoomConfig.out;

        valuesArr.forEach(val => {
            let viewBoxValue = val * zoomValue;
            newValues.push(viewBoxValue);
        });

        return newValues;
    }
    
    
    
    zoom(direction) {
        let values = this.calculateZoom(direction);
        this.activeViewBox = values.join(" ");
        this.animateZoom();
    }
    
    animateZoom() {
        this.tl.to(this.map, 1.5, { attr: { viewBox: this.activeViewBox } });
    }
    
}