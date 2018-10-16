import AbstractDispatcher from "./AbstractDispatcher.js";
import { Employee } from "./Employees.js";
// import InfoCards from "./InfoCard.js";
import { EventType } from "./events/EventType.js";

export class DesksManager extends AbstractDispatcher {
    constructor() {
        super();

        this.desksArr = [];

        // Bind methods to class
        this.addDesk = this.addDesk.bind(this);
        this.getClickedDesk = this.getClickedDesk.bind(this);
        this.getDesksFromSearch = this.getDesksFromSearch.bind(this);
        this.getDeskFromID = this.getDeskFromID.bind(this);
    }

    addDesk(e) {
        this.desksArr.push(new Desk(e));
    }

    removeDesk(el) {
        let index = this.desksArr.indexOf(el);
        if (index > -1) {
            this.desksArr.splice(index, 1);
        }
    }

    getClickedDesk(e) {
        this.getDeskFromID(e.el.id, EventType.CLICK);

    }
    
    getDesksFromSearch(e) {
        let searchResults = e.search;

        this.dispatch({type: EventType.CLEAR });
        searchResults.forEach(desk => {
            this.getDeskFromID(desk.pathID, EventType.SEARCH);
        });
    }

    getDeskFromID(id, eventType) {
        this.desksArr.forEach(desk => {
            console.log('searching,', desk, event, id);
            let deskID = desk.id;
            if (deskID.indexOf(id, 0) !== -1) {
                this.dispatch({type: eventType, users: desk.users });
                return desk;
            }
        });
    }

    get desks() {
        return this.desksArr;
    }
}

export class Desk extends AbstractDispatcher {
    constructor(config) {
        super();

        this.id = config.data.pathID;
        this.users = [];

        this.getUsersFromData(config.data.employees);
        document.querySelector('svg #' + this.id).classList.add('has-users');
    }

    getUsersFromData(employees) {
        employees.forEach(employee => {
            let user = new Employee(this.id, employee);
            this.users.push(user);
            // this.dispatch({ type: EventType.NEW_EMPLOYEES, employee: user });
        });
    }

    getUsers() {
        return this.employees;
    }
}
