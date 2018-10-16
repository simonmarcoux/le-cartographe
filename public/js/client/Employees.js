import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export default class EmployeeManager extends AbstractDispatcher {
    constructor() {
        super();

        this.list = [];

        this.addEmployee = this.addEmployee.bind(this);
    }

    addEmployee(config) {
        let employee = new Employee(config);
        this.list.push(employee);

        this.dispatch({ type: EventType.ADD_EMPLOYEE, employee: employee, id: employee.id });
    }

    getList() {
        return this.list;
    }
}

export class Employee extends AbstractDispatcher {
    constructor(config) {
        super(); 

        this.id = config.data.pathID;
        this.name = config.data.name;
        this.group = config.data.groupe.label;
        this.job = config.data.job;
    }
    
}