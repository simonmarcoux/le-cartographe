export default class Marker {
    constructor() {
        this.marker = null;
        this.originCoords = null;
        // this.active = false;
        this.pos = {x, y};
    }

    // add point on map at 
    add(coords) {
        this.pos = coords;
        let marker = this.create(this.pos);
        app.stage.addChild(marker);
    }

    // create pixi red circle
    create(app, coords) {
        this.marker = new PIXI.Graphics();
        this.marker.beginFill(0x5cafe2);
        this.marker.drawCircle(0, 0, 40);
        this.marker.x = coords.x;
        this.marker.y = coords.y;

        return this.marker;
    }

    set origin(el) {
        this.originCoords = { x: 0, y: 0 };
    }

    // set active(value) {
    //     this.active = value;
    // }

    // set marker(coords) {
    //     this.add(coords)
    // }
}


// svg path creation ? with a grid on top of the map
// https://codepen.io/anthonydugois/pen/mewdyZ