import AbstractDispatcher from "./AbstractDispatcher";

export default class Search extends AbstractDispatcher {
    constructor(form = document.querySelector('.search'), list = '') {
        super();

        this.form = form;

        this.form.addEventListener('submit', e => {
            e.preventDefault();

            let value = this.form.querySelector('input').value;
            this.searchEmployee(value)

        });

    }

    searchEmployee(searchValue) {
        console.log('search for input value')
        // https://github.com/ianstormtaylor/closest-match
    }
}