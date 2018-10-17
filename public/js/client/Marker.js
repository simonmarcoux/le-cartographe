import { Vec2 } from "./Math.js";

export default class Marker {
    constructor() {
        this.marker = null;

        // this.active = false;
        this.origin = { x: 1155, y: 220 };
        this.pos = { x: 0, y: 0 };

        this.ratioPixelMeter = 10; // 10:1;

        this.svg = document.querySelector("svg");
        this.rect = this.svg.querySelector("path");
        this.pt = this.svg.createSVGPoint();

        this.svg.addEventListener("mousedown", this.handleClick.bind(this), false);
    }

    handleClick(e) {
        // Source idea to get svg click position
        // https://stackoverflow.com/a/42711775
        const cursorpt = this.cursorPoint(e, this.rect);
        this.pos = new Vec2(cursorpt.x, cursorpt.y);
        console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");
        
        let circle = this.svg.querySelector('circle');
        circle.setAttribute('cx', this.pos.x);
        circle.setAttribute('cy', this.pos.y);
        circle.style.display = "block";
    }

    updateCircle(x, y);
        
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
        
    }

    // add point on map at 
    // add(coords) {
    //     this.pos = coords;
    //     let marker = this.create(this.pos);
    //     app.stage.addChild(marker);
    // }

    // // create pixi red circle
    // create(app, coords) {
    //     this.marker = new PIXI.Graphics();
    //     this.marker.beginFill(0x5cafe2);
    //     this.marker.drawCircle(0, 0, 40);
    //     this.marker.x = coords.x;
    //     this.marker.y = coords.y;

    //     return this.marker;
    // }

    // set origin(el) {
    //     this.originCoords = { x: 0, y: 0 };
    // }

    // set active(value) {
    //     this.active = value;
    // }

    // set marker(coords) {
    //     this.add(coords)
    // }
}


// svg path creation ? with a grid on top of the map
// https://codepen.io/anthonydugois/pen/mewdyZ