import Map from "./map.js";
import InfoCard from "./InfoCard.js";
import { DesksManager } from "./desk.js";
import { loadMap } from "./loader.js";

export default class Main {
    constructor() {
        this.map = new Map();
        this.infoCard = new InfoCard(document.querySelector('.cards__item'));

        console.log('main')
        this.deskManager = new DesksManager();
        console.log(this.deskManager);
        this.deskManager.addListener('ADD_DESK', this.deskManager.addDesk());

        // Get data from json 
        loadMap('gen')
        .then((data) => {
            // json is loaded, get all items
            console.log(data);
        })
    }
}

// function main() {
//         this.map = new Map();
//         this.infoCard = new InfoCard(document.querySelector('.cards__item'));

//         this.deskManager = new DesksManager();
//         this.deskManager.addListener('ADD_DESK', this.deskManager.addDesk());
//         console.log(this.deskManager);
// }

new Main();

