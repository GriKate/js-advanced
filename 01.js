const products = [
    {id: 1, title: 'Notebook', price: 2000,},
    {id: 2, title: 'Mouse', price: 30,},
    {id: 3, title: 'Keyboard', price: 55,},
    {id: 4, title: 'Gamepad',},
];

const renderProduct = (title, price = 'Out of stock', img = 'https://placehold.it/200x150') => {
    return `<div class="product-item">
                <img src="${img}">
                <div class="item-desc">
                    <h3>${title}</h3>
                    <p>${price}</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
};

const renderPage = list => {
    // const productList = list.map(item => renderProduct(item.title, item.price));
    // document.querySelector('.products').innerHTML = productList.join('\r\n');
    for (let product of list) {
        document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(product.title, product.price))
    }
};

renderPage(products);

