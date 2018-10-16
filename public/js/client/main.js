import Map from "./map.js";
import InfoCard from "./InfoCard.js";
import { DesksManager } from "./Desk.js";
// import { EmployeesList } from "./Employees.js";
import { loadMap } from "./loader.js";
import { EventType } from "./events/EventType.js";
import AbstractDispatcher from "./AbstractDispatcher.js";
import CardsManager from "./InfoCard.js";
import Search from "./Search.js";

export default class Main extends AbstractDispatcher {
    constructor() {
        super(); 

        this.map = new Map();
        // this.employeesList = new EmployeesList();
        this.deskManager = new DesksManager();
        this.cardsManager = new CardsManager();

        this.search = new Search();

        // Get data from json 
        loadMap('gen')
        .then((data) => {
            // json is loaded, get all items
            this.map.placeElements(data);
            this.map.getMapName(data.mapName);
            console.log(data);
            this.search.init(document.querySelector('.search'), data);
        }).then(() => {
            // let desks = this.deskManager.desks;
            // desks.forEach(desk => {
            //     console.log('loop in desks', desk);
            //     desk.addListener(EventType.NEW_EMPLOYEES, this.employeesList.addEmployee);
            // });
            
            // // console.log(this.employeesList.getEmployees());
        });
        
        this.map.addListener(EventType.ADD_DESK, this.deskManager.addDesk);
        this.map.addListener(EventType.CLICK, this.deskManager.getClickedDesk);
        this.deskManager.addListener(EventType.CLICK, this.cardsManager.update);
        this.deskManager.addListener(EventType.SEARCH, this.cardsManager.update);
        this.search.addListener(EventType.SEARCH, this.deskManager.getDeskFromSearch);

        // this.infoCard = new InfoCard(document.querySelector('.cards__item'));
    }
}

new Main();

