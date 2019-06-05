
class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    renderProduct () {
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="item-desc">
                        <h3>${this.title}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`
    }
}

class ProductsList {
    constructor(container = '.products') { //значение аргумента по умолчанию
        this.container = container;
        this.data = []; //сырые данные с сервера
        this.allProducts = []; //экземпляры товара - ProductsItem
        this.init(); //вызываем после создания свойств
    }
    init() {
        this._fetchProducts();
        this._render();
        this._count();
    }
    _fetchProducts() { //инкапсулированный! метод запроса на сервер - получает все товары
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 75},
        ];
    }
    _render() { //инкапсулированный! рендеринг товаров
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item); //получаем новый экземпляр класса. Передаем item конструктору класса ProductItem в product
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.renderProduct());
        }
    }
    _count() {
        let totalPrice = 0;
        const totalContainer = document.querySelector('.total');
        for (let item of this.allProducts) {
             const price = item.price;
             totalPrice += price;
        }
        totalContainer.insertAdjacentHTML('beforeend',`Товаров на сумму: ${totalPrice}`);
    }
}

const products = new ProductsList(); //здесь вызовется только конструктор класса, но в конце конструктор сам вызывает все методы класса
// products.fetchProducts();
// products.render();





class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.productsInCart = []; // будем добавлять в массив товары - новые классы CartProduct
        this.totalSum = 0; // сумма товаров в корзине будет пересчитываться методом count()
        this.handleBuyClick();
    }
    handleBuyClick() {
        //вешаем обработчик на <div className="products">
        //событие на кнопке - target - получаем id товара
        //передаем id в метод isInCart() корзины
    }
    isInCart(id) {
        //проверяем по id, есть ли товар в корзине (в массиве productsInCart)
        //если есть, quantity++
        //const newProduct - если нет, находим товар по id в массиве allProducts
        //создаем новый класс CartProduct
        // push в массив productsInCart
        //this.init();
    }
    init() {
        this._render();
        this._count();
    }
    _render() {
        for (let item of this.productsInCart) {
            //рендерим разметку товара
        }
        //генерируем корзину - склеиваем разметку всех товаров в container
    }
    _count() {
        //подсчет и отображение в разметке итоговой суммы
    }
}

class CartProduct {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this.quantity = 1; //количество = 1 изначально
    }
    render() {
        //разметка для товара
    }
}

const newCart = new Cart();