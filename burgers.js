class Burger {
    constructor() {
        this.size = [
            {name: 'small', cal: 20, price: 50,},
            {name: 'big', cal: 40, price: 100,},
        ];
        this.stuff = [
            {name: 'cheese', cal: 20, price: 10,},
            {name: 'salad', cal: 5, price: 20,},
            {name: 'potato', cal: 10, price: 15,},
        ];
        this.init();
    }
    init() {
        this._getSize();
        this._getStuff();
        this._calculateCalories();
        this._calculatePrice();
    }
    _getSize() {
        const inputSize = +prompt(`Input size: 1) ${this.size[0].name} 2) ${this.size[1].name}`);
        this.size = this.size[inputSize - 1];
    }
    _getStuff() {
        const inputStuff = +prompt(`Input stuff: 1) ${this.stuff[0].name} 2) ${this.stuff[1].name} 3) ${this.stuff[2].name}`);
        this.stuff = this.stuff[inputStuff - 1];
    }
    _calculateCalories() {
        const calories = this.size.cal + this.stuff.cal;
        alert(`${calories}`);
    }
    _calculatePrice() {
        const calcPrice = this.size.price + this.stuff.price;
        alert(`${calcPrice}`);
    }
}
const newBurger = new Burger();
console.log(newBurger);