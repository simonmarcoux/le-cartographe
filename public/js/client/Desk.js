import AbstractDispatcher from "./AbstractDispatcher.js";
import { Vec2 } from "./Math.js";
import { Employee } from "./Employees.js";
// import InfoCards from "./InfoCard.js";
import { EventType } from "./events/EventType.js";


// const groups = {
//     GEN: Symbol('gen'),
//     G1: Symbol('g1'),
//     G2: Symbol('g2'),
//     DESIGN: Symbol('design'),
// }

export class DesksManager extends AbstractDispatcher {
    constructor() {
        super();

        this.desksArr = [];

        // Bind methods to class
        this.addDesk = this.addDesk.bind(this);
        this.getClickedDesk = this.getClickedDesk.bind(this);
    }

    addDesk(e) {
        this.desksArr.push(new Desk(e));
    }

    removeDesk(el) {
        let index = this.desksArr.indexOf(el);
        if (index > -1) {
            this.desksArr.splice(index, 1)
        }
    }

    getClickedDesk(e) {
        this.desksArr.forEach(desk => {
            let deskID = desk.id;
            if (deskID.indexOf(e.el.id, 0) !== -1) {
                this.dispatch({type: EventType.CLICK, users: desk.users });
                return desk;
            }
        })
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
        });
    }

    getUsers() {
        return this.employees;
    }
}
