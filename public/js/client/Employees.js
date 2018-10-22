import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export default class EmployeeManager extends AbstractDispatcher {
    constructor() {
        super();

        this._list = [];

        this.addEmployee = this.addEmployee.bind(this);
    }

    addEmployee(config) {
        let employee = new Employee(config);
        this._list.push(employee);

        this.dispatch({ type: EventType.ADD_EMPLOYEE, employee: employee, id: employee.id });
    }

    get list() {
        return this._list;
    }
}

export class Employee {
    constructor(config) {
        this.id = config.data.pathID;
        this.name = config.data.name;
        this.group = config.data.groupe.label;
        this.job = config.data.job;
    }
    
}