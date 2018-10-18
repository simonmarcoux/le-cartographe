import { Vec2 } from "./Math.js";

// export class MarkerManager {
//     constructor() {
        
//     }
// }

export default class Marker {
    constructor() {
        // this._marker = null;

        // this.active = false;
        this.origin = new Vec2(1155, 220); //{ x: 1155, y: 220 };
        this.posFromOrigin = new Vec2(0, 0);
        this.pos = { x: 0, y: 0 };

        this.scale = 10; // 10:1;

        this.svg = document.querySelector("svg");
        this.rect = this.svg.querySelector("path");
        this.pt = this.svg.createSVGPoint();
        this.circle = this.svg.querySelector('circle');

        
        this.addBtn = document.querySelector('[data-ui="add-marker"]');
        this.removeBtn = document.querySelector('[data-ui="remove-marker"]');
        
        this.handleClick = this.handleClick.bind(this);

        this.addBtn.addEventListener('click', e => {
            this.svg.addEventListener("mousedown", this.handleClick);
        });

        this.removeBtn.addEventListener('click', e => {
            this.removeAllMarkers();
        });

        this.input = document.querySelector('input')
    }

    addMarker() {
        this.circle.style.display = "block";
    }
    
    removeMarker() {
        this.circle.style.display = "none";
    }

    handleClick(e) {
        // Source idea to get svg click position
        // https://stackoverflow.com/a/42711775
        const cursorpt = this.cursorPoint(e, this.rect);
        this.pos = new Vec2(cursorpt.x, cursorpt.y);
        // console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");
        
        this.updateCircle(this.pos);
        this.addMarker();

        console.log()
        this.svg.removeEventListener("mousedown", this.handleClick);
    }
    
    updateCircle(pos) {
        this.circle.setAttribute('cx', this.pos.x);
        this.circle.setAttribute('cy', this.pos.y);
    }
        
    cursorPoint(e, element) {
        this.pt.x = e.clientX; 
        this.pt.y = e.clientY;
        
        if (element === null)
            return this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
        else
            return this.pt.matrixTransform(element.getScreenCTM().inverse());
    }

    transformMeterToPx(values) {
        let newValues = { x: values.x *= 10, y: values.y *= 10 }

        return newValues;
    }

    getPosFromOrigin(pos = {x: 12.5, y: 2}) {
        this.posFromOrigin.x = this.origin.x + pos.x;
        this.posFromOrigin.y = this.origin.y + pos.y;

        this.updateCircle(this.posFromOrigin);
        return this.posFromOrigin;
    }
}


// svg path creation ? with a grid on top of the map
// https://codepen.io/anthonydugois/pen/mewdyZ