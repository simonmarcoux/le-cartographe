export default class CardsManager {
    constructor(el = document.querySelector('.cards')) {
        this.el = el;

        this.cardsList = [];
        
        this.update = this.update.bind(this);
        this.updateFromSearch = this.updateFromSearch.bind(this);
        this.cleanList = this.cleanList.bind(this);
    }
    
    
    update(e) {
        let users = e.users;
        
        this.cleanList();
        
        users.forEach(user => {
            this.addCard(user)
        });
    }
    
    updateFromSearch(e) {
        e.users.forEach(user => {
            this.addCard(user);
        })
    }
    
    addCard(user) {
        let card = new EmployeeCard(user);
        this.cardsList.push(card);
    }

    removeCard() {

    }

    cleanList() {
        if (this.cardsList && this.el) {
            this.cardsList.length = 0;
            this.el.innerHTML = "";
        }
    }
}

class EmployeeCard {
    constructor(infos) {
        this.infos = infos;

        let template = `
            <div class="card--item">
                ${this.infos.name}, ${this.infos.group}, ${this.infos.job}
                <span data-card="remove">X</span>
            </div>
        `;

        let item = document.createElement('li');
        item.innerHTML = template;
        document.querySelector('.cards').appendChild(item);
    }
}