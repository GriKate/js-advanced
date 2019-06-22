Vue.component('products', {
    data() {
        return {
            urlCatalog: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            //присваиваем массиву filtered массив товаров каталога, возвращенный методом filter
        },
    },
    mounted() {
        this.$parent.getJson(`${API+ this.urlCatalog}`) // получили data
            .then(data => {
                for (let el of data) {
                    this.products.push(el); //создаем товары - элементы массива products - из масива данных
                    this.filtered.push(el); // изначально отображаются все товары каталога
                }
            })
        this.$parent.getJson('getProducts.json')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `<div class="products">
                    <product 
                        v-for="product of filtered" 
                        :key="product.id_product" 
                        :product-item="product" 
                        :img="imgCatalog">
                    </product> <!-- тег - это название Vue.component 'product' -->
                </div>`
});

Vue.component('product', {
    props: ['productItem', 'img'],
    // 'productItem' - это место, куда вставится разметка Vue.component 'product'
    // в то же время Vue.component 'products' передает в 'productItem' объект товара из массива filtered из глобал. Vue
    template:
        `<div class="product-item">
            <img :src="img">
            <div class="item-desc">
                <h3>{{productItem.product_name}}</h3>
                <p>{{productItem.price}}</p>
                <button class="buy-btn" @click="$root.$refs.cart.addToCart(productItem)">Купить</button> 
            </div>
        </div>` // корневой - через $refs соединились с другим потомком и вызвали его функцию
});