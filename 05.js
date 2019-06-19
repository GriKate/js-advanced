const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

new Vue ({
    el: '#app',
    data: {
        urlCatalog: '/catalogData.json',
        urlCart: '/getBasket.json',
        products: [],
        cart: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/70x100',
        filtered: [],
        searchWord: ''
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        deleteProd(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(item), 1)
                        }
                    } else {
                        console.log(error);
                    }
                })
                .catch(error => console.log(error))
        },
        addToCart(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let prodInCart = this.cart.find(el => el.id_product === product.id_product);
                        if (prodInCart) {
                            prodInCart.quantity++;
                        } else {
                            let prodToCart = Object.assign({quantity: 1}, product);
                            this.cart.push(prodToCart);
                        }
                    } else {
                        console.log(error);
                    }
                })
                .catch(error => console.log(error))
        },
        filter() {
            let regexp = new RegExp(this.searchWord, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted() {
        this.getJson(`${API+ this.urlCatalog}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el); 
                }
            })
        this.getJson('getProducts.json')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
        this.getJson(`${API + this.urlCart}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            })
    }
});