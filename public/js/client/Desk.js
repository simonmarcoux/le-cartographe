import AbstractDispatcher from "./AbstractDispatcher.js";
import { Vec2 } from "./Math.js";

const groups = {
    GEN: Symbol('gen'),
    G1: Symbol('g1'),
    G2: Symbol('g2'),
    DESIGN: Symbol('design'),
}

const json = {
    "mapName": "GEN",
    "locations": {
        "items": [
            {
                "name": "Simon Marcoux",
                "group": "Gen",
                "job": "Développeur Web",
                "path": "path27228"
            },
            [
                {
                
                    "name": "Francois Perreault",
                    "group": "Gen",
                    "job": "Développeur Web"
                },
                {
                    "name": "Louis-Philippe Favreau",
                    "group": "Gen",
                    "job": "Directeur",
                    "path": ""
                }
            ]
        ]
    }
};

export class DesksManager extends AbstractDispatcher {
    constructor() {
        super();

        this.desksArr = [];
    }

    addDesk() {
        this.desksArr.push(new Desk());
    }

    removeDesk(el) {
        let index = this.desksArr.indexOf(el);
        if (index > -1) {
            this.desksArr.splice(index, 1)
        }
    }

    get desks() {
        return this.desksArr;
    }

    // set desks(desks) {
    //     this.desks = desks;
    // }
}

export default class Desk {
    constructor(el) {
        this.el = el;
        this.pos = new Vec2(0, 0);
        this.user = "John Doe";
        this.userGroup = "GEN";

        console.log('wat');
    }

    // set pos(coords) {
    //     this.pos = coords;
    // }

    // get pos() {
    //     return this.pos;
    // }

    // get group() {
    //     return this.group;
    // }

    // set group(group) {
    //     this.group = group;
    // }
    
    // get user() { return this.user; }
    // set user(user) { this.user = user; }
}