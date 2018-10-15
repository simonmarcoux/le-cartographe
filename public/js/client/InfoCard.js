export default class CardsManager {
    constructor(el = document.querySelector('.cards')) {
        this.el = el;

        this.cardsList = [];
        
        this.update = this.update.bind(this);
        console.log(el);
    }
    
    
    update(e) {
        let users = e.users;
        
        this.cleanList();
        
        users.forEach(user => {
            this.addCard(user)
        });

        console.log('test', this.cardsList);
    }
    
    addCard(user) {
        let card = new EmployeeCard(user);
        this.cardsList.push(card);
    }

    removeCard() {

    }

    cleanList() {
        this.cardsList.length = 0;
        this.el.innerHTML = "";
    }
}

class EmployeeCard {
    constructor(infos) {
        this.infos = infos;

        console.log('infos', infos);
        

        let template = `
            <div class="card--item">

                ${this.infos.name}, ${this.infos.group}, ${this.infos.job}
            </div>
        `;

        let item = document.createElement('div');
        item.innerHTML = template;
        document.querySelector('.cards').appendChild(item);
    }
}

// NOTE: Can be multiple employees per desk, so one card per employee 