const products = [
    {id: 1, title: 'Notebook', price: 2000,},
    {id: 2, title: 'Mouse', price: 30,},
    {id: 3, title: 'Keyboard', price: 55,},
    {id: 4, title: 'Gamepad', price: 75,},
];

const renderProduct = (title = products.title, price = products.price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};

const renderPage = list => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productList.join('\r\n');
};

renderPage(products);
