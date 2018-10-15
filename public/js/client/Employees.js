import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export class EmployeesList {
    constructor() {
        this.list = [];
    }

    addEmployee(employee) {
        this.list.push(employee);
    }

    getEmployees() {
        return this.list;
    }
}

export class Employee extends AbstractDispatcher {
    constructor(deskId, config) {
        super(); 

        this.id = deskId;

        this.name = config.name;
        this.group = config.group;
        this.job = config.job;

        this.dispatch({ type: EventType.NEW_EMPLOYEE, employee: this });
    }
}