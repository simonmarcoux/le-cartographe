import Map from "./map.js";
import { DesksManager } from "./Desk.js";
import { loadMap } from "./loader.js";
import { EventType } from "./events/EventType.js";
import AbstractDispatcher from "./AbstractDispatcher.js";
import CardsManager from "./InfoCard.js";
import Search from "./Search.js";

export default class Main extends AbstractDispatcher {
    constructor() {
        super(); 

        this.map = new Map();
        this.deskManager = new DesksManager();
        this.cardsManager = new CardsManager();

        this.search = new Search();

        // Get data from json 
        loadMap('gen')
        .then((data) => {
            // json is loaded, get all items
            this.map.placeElements(data);
            this.map.getMapName(data.mapName);
            this.search.init(document.querySelector('.search'), data);
        })
        
        // Triggered after load
        this.map.addListener(EventType.ADD_DESK, this.deskManager.addDesk);

        // Triggered on click
        this.map.addListener(EventType.CLICK, this.deskManager.getClickedDesk);
        this.deskManager.addListener(EventType.CLICK, this.cardsManager.update);
        
        // Events trigger on search
        this.search.addListener(EventType.SEARCH, this.deskManager.getDesksFromSearch);
        this.deskManager.addListener(EventType.EventType.CLEAR, this.cardsManager.cleanList);
        this.deskManager.addListener(EventType.SEARCH, this.cardsManager.updateFromSearch);
    }
}

new Main();

