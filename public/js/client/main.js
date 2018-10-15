import Map from "./map.js";
import InfoCard from "./InfoCard.js";
import { DesksManager } from "./Desk.js";
import { EmployeesList } from "./Employees.js";
import { loadMap } from "./loader.js";
import { EventType } from "./events/EventType.js";
import AbstractDispatcher from "./AbstractDispatcher.js";
import CardsManager from "./InfoCard.js";
import Search from "./Search.js";

export default class Main extends AbstractDispatcher {
    constructor() {
        super(); 

        this.map = new Map();
        
        // Get data from json 
        loadMap('gen')
        .then((data) => {
            // json is loaded, get all items
            this.map.placeElements(data);
            this.map.getMapName(data.mapName);
        });
        
        this.employeesList = new EmployeesList();
        this.deskManager = new DesksManager();
        this.cardsManager = new CardsManager();

        this.map.addListener(EventType.ADD_DESK, this.deskManager.addDesk);
        this.map.addListener(EventType.CLICK, this.deskManager.getClickedDesk);


        this.deskManager.addListener(EventType.CLICK, this.cardsManager.update)
        

        new Search();
        // this.infoCard = new InfoCard(document.querySelector('.cards__item'));
    }
}

new Main();

