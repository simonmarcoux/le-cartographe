import AbstractDispatcher from "./AbstractDispatcher.js";

export default class Map extends AbstractDispatcher {
    
    constructor() {
        super();

        this.map = document.querySelectorAll('.map-wrp svg');
        this.handlePathClick(this.getPaths());
    }
    
    getPaths() {
        return document.querySelectorAll('path');
    }
    
    handlePathClick(paths) {
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            path.addEventListener('click', e => {
                console.log('click on path', e.currentTarget)
                this.dispatch({ type: 'ADD_DESK', el: e.currentTarget });

                let id = e.currentTarget.id;
                document.querySelector('.number').innerHTML = id;
                e.currentTarget.classList.toggle('active');

            });
            
        }

    }
}