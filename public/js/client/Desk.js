import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export class DesksManager extends AbstractDispatcher {
    constructor() {
        super();

        this.desksArr = [];
        this.desksSearched = [];

        // Bind methods to class
        this.addDesk = this.addDesk.bind(this);
        this.getClickedDesk = this.getClickedDesk.bind(this);
        this.getDesksFromSearch = this.getDesksFromSearch.bind(this);
        this.getDeskFromID = this.getDeskFromID.bind(this);
    }

    addDesk(e) {
        if (e.id === null) return;

        if (this.desksArr.length === 0) {
            this.desksArr.push(new Desk(e.employee));
            return;
        } 

        let deskIndex = this.desksArr.findIndex(x => x.id === e.id);
        if (deskIndex !== -1) {
            this.desksArr[deskIndex].addUser(e.employee);
        } else {
            this.desksArr.push(new Desk(e.employee));
        }
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
        this.dispatch({type: EventType.CLEAR });

        this.desksSearched.length = 0;
        let searchResults = e.search;
        
        searchResults.forEach(user => {
            if (user.pathID === null) return;
            if (this.desksSearched.indexOf(user.pathID) > -1) {
                return;
            } else { 
                this.getDeskFromID(user.pathID, EventType.SEARCH, true);
                this.desksSearched.push(user.pathID);
            }
        });
    }

    getDeskFromID(id, eventType, highlight = false) {
        this.desksArr.forEach(desk => {
            let deskID = desk.id;
            if (deskID.indexOf(id) !== -1) {
                this.dispatch({type: eventType, users: desk.users });

                if (highlight) {
                    desk.el.classList.add('active');
                }
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

        this.config = config;
        this.id = this.config.id;
        this.users = [this.config];

        document.querySelector('svg #' + this.id).classList.add('has-users');
    }

    get el() { 
        return document.querySelector('svg #' + this.id);
    }

    getUsers() {
        return this.users;
    }

    addUser(user) {
        this.users.push(user);
    }
}
