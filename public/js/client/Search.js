import AbstractDispatcher from "./AbstractDispatcher.js";
import { EventType } from "./events/EventType.js";

export default class Search extends AbstractDispatcher {
    constructor() {
        super();

        this.form;
        this.fuse;
        
        this.options = {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 200,
            maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: ['name', 'groupe.label', 'job'],
        };   
    }
    
    init(form, data) {
        this.form = form;
        this.fuse = new Fuse(data, this.options);
        
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            
            let value = this.form.querySelector('input').value;
            this.searchEmployee(value);
        });
    }

    searchEmployee(searchValue) {
        this.dispatch({type: EventType.SEARCH, search: this.fuse.search(searchValue)});
        return this.fuse.search(searchValue);
    }
}