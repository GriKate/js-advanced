const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/////////////////// Promise
let getData = url => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return
            }
            if (xhr.status !== 200) {
                reject('error');
            } else {
                resolve(xhr.responseText);
            }
        };
        xhr.send();
    })
};

getData('03.json')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
    });


/////////// XMLHttpRequest
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState !== 4) {
//             return
//         }
//         if (xhr.status !== 200) {
//             console.log(`error ${xhr.status} ${xhr.statusText}`)
//         } else {
//             cb(xhr.responseText);
//         }
//     };
//     xhr.send();
// };
//
// getRequest('03.json', (smth) => {
//     console.log(`OK ${smth}`)
// });



class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    renderProduct () {
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="item-desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                    </div>
                </div>`
    }
}

class ProductsList {
    constructor(container = '.products') { //значение аргумента по умолчанию
        this.container = container;
        this.data = []; //сырые данные с сервера
        this.allProducts = []; //экземпляры товара - ProductsItem
        // this.init(); //вызываем после создания свойств
        this._fetchProducts()
            .then(() => this._render()) //в _fetchProducts() вернули промис, поэтому можем после стандартных обработчиков добавить еще 1
    }
    // init() {
    //     this._fetchProducts();
    //     this._render();
    //     this._count();
    // }
    _fetchProducts() { //инкапсулированный! метод запроса на сервер - получает все товары
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json()) //опускаем (), {} и return
            .then(data => {
                this.data = [...data]; //чтобы не передавать ссылку на данные, создаём новый массив
                // this._render();
            })
            .catch((error) => console.log('error'))
    }
    _render() { //инкапсулированный! рендеринг товаров
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item); //получаем новый экземпляр класса. Из данных с сервера создаем объект товара
            this.allProducts.push(product); //помещаем объект товара в массив со всеми товарами
            block.insertAdjacentHTML('beforeend', product.renderProduct()); //генерируем разметку товара в каталоге
        }
    }
}

const products = new ProductsList(); //здесь вызовется только конструктор класса, но в конце конструктор сам вызывает все методы класса
console.log(products.allProducts);


///////////////////////////корзина


class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.productsInCart = []; // будем добавлять в массив товары - новые классы CartProduct
        this.totalSum = 0; // сумма товаров в корзине будет пересчитываться методом count()
        this.handleBuyClick();
    }
    handleBuyClick() {
        const catalog = document.querySelector('.products');
        catalog.addEventListener('click', (event) => {
            let productId = +event.target.dataset.id;
            console.log(productId);
            isInCart(productId);
        }) //вешаем обработчик на <div className="products">
        //событие на кнопке - target - получаем id товара
        //передаем id в метод isInCart() корзины
    }
    isInCart(id) {
        for (let item of this.productsInCart) {
            if (this.productsInCart.id_product === id) {
                this.productsInCart.quantity++;
            } else {
                for (let i = 0; i < products.allProducts.length; i++) {
                    if (products.allProducts[i].id_product === id) {
                        const newProduct = products.allProducts[i];
                        const newCartProduct = new CartProduct(newProduct);
                        this.productsInCart.push(newCartProduct);
                        this.init();
                    }
                }
                //
            }
        }//проверяем по id, есть ли товар в корзине (в массиве productsInCart)
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
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = product.img;
        this.quantity = 1; //количество = 1 изначально
    }
    render() {
        `<div id="cart-section">
            <img src="" alt="" class="cart-img">
                <h4 class="cart-title"></h4>
                <p class="cart-price"></p>
                <button class="cart-button"> X </button>
<!--                <h3 class="cart-total"></h3>-->
<!--                <a href="#" class="cart-button-link">Перейти в корзину</a>-->
        </div>`//разметка для товара
    }
}

const newCart = new Cart();