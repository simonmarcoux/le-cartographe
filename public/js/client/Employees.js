import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";


// List used only as a repertory for search 
// export class EmployeesList {
//     constructor() {
//         this.list = [];

//         this.addEmployee = this.addEmployee.bind(this);
//     }

//     addEmployee(e) {
//         console.log('list', e);
//         this.list.push(employee);
//     }

//     getEmployees() {
//         return this.list;
//     }
// }

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