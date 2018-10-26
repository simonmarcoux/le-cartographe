import { Vec2 } from "./Math.js";

// export class MarkerManager {
//     constructor() {
        
//     }
// }

export default class Marker {
    constructor() {
        this.origin = new Vec2(1155, 220); // { x: 1155, y: 220 };
        this.posFromOrigin = new Vec2(0, 0);
        this.pos = { x: 0, y: 0 };

        this.scale = 12;

        this.svg = document.querySelector("svg");
        this.rect = this.svg.querySelector("path");
        this.pt = this.svg.createSVGPoint();
        this.circle = this.svg.querySelector('circle');
        this.path = this.svg.querySelector('.custom-path');
        this.pathCoords = [];

        
        this.addBtn = document.querySelector('[data-ui="add-marker"]');
        this.removeBtn = document.querySelector('[data-ui="remove-marker"]');
        this.pathBtn = document.querySelector('[data-ui="add-path"]');
        this.endPathBtn = document.querySelector('[data-ui="end-path"]');
        this.form = document.querySelector('.from-origin');
        
        this.handleClick = this.handleClick.bind(this);
        this.createPath = this.createPath.bind(this);

        this.addBtn.addEventListener('click', e => {
            this.svg.addEventListener("mousedown", this.handleClick);
        });

        this.pathBtn.addEventListener('click', e => {
            this.svg.addEventListener("mousedown", this.createPath);
        });

        this.endPathBtn.addEventListener('click', e => {
            this.svg.removeEventListener("mousedown", this.createPath);
        });
        
        // this.pathBtn.addEventListener('click', e => {
        //     this.path.classList.add('active');
        // });

        // this.removeBtn.addEventListener('click', e => {
        //     this.removeAllMarkers();
        // });

        this.form.addEventListener('submit', e => {
            e.preventDefault();

            const x = parseInt(this.form.querySelector('.coord-x').value) * this.scale;
            const y = parseInt(this.form.querySelector('.coord-y').value) * this.scale;
            
            this.getPosFromOrigin(new Vec2(x, y));
            this.updateCircle(this.posFromOrigin);
            this.addMarker();
        });

        // this.coordsToPath();
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
        
        this.updateCircle(this.pos);
        this.addMarker();

        this.svg.removeEventListener("mousedown", this.handleClick);
    }
    
    updateCircle(pos) {
        this.circle.setAttribute('cx', pos.x);
        this.circle.setAttribute('cy', pos.y);
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
    }

    createPath(e) {
        let pt = this.svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        let svgPoint =  pt.matrixTransform(this.rect.getScreenCTM().inverse());
        // let coord = new Vec2(e.clientX, e.clientY);

        this.pathCoords.push(svgPoint);
        // this.pathCoords.push(coord);
        console.log(this.pathCoords);
        this.coordsToPath(this.pathCoords);
    }

    coordsToPath(coords = [ new Vec2(1000, 200), new Vec2(1000, 170), new Vec2(1080, 170), new Vec2(1080, 350), new Vec2(1100, 350)]) {
        const startPoint = `M ${coords[0].x}, ${coords[0].y} `;
        let linesTo = '';
        let lastCoords;
    
        coords.forEach((coord, index) => {
            if (index === 0) return;

            let L;
            let newCoords;
            index === 1 ? L = 'L' : L = 'l';
            if (index === 1) {
                newCoords = coord;
            } else {
                newCoords = { x: coord.x - lastCoords.x, y :  coord.y - lastCoords.y };
            }

            const string = `${L} ${newCoords.x} ${newCoords.y} `;
            linesTo += string;

            lastCoords = coord;
        });
    
        let path = startPoint + linesTo;
        console.log(path);
    
        document.querySelector('.custom-path').setAttribute('d', path);
    }
}


// svg path creation ? with a grid on top of the map
// https://codepen.io/anthonydugois/pen/mewdyZ