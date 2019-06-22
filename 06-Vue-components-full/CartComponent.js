Vue.component('cart', {
    data() {
        return {
            urlCart: '/getBasket.json',
            cart: [],
            imgCart: 'https://placehold.it/70x100',
        }
    },
    methods: {
        addToCart(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
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
        deleteProd(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
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
    },
    mounted() {
        this.$parent.getJson(`${API + this.urlCart}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            })
    },
    template: `<div class="cart">
                    <p v-if="cart.length < 1">Корзина пуста</p>
                    <cartProd 
                        v-for="item of cart" 
                        :key="item.id_product"
                        :cart-item="item" 
                        :img="imgCart"
                        @remove="deleteProd">
                    </cartProd>
                </div>`
});

Vue.component('cartProd', {
    props: ['cartItem', 'img'],
    template: `<div id="cart-section">
                        <img :src="img" class="cart-img">
                        <div class="cart-desc">
                            <h4 class="cart-title">{{cartItem.product_name}}</h4>
                            <p class="cart-quantity">Количество: {{cartItem.quantity}}</p>
                        </div>
                        <div class="cart-desc">
                            <p class="cart-price">{{cartItem.price}}</p>
                            <button class="cart-delete-button" @click="$emit('remove', cartItem)">&times;</button>
                        </div>
                        <!--                <h3 class="cart-total"></h3>-->
                        <!--                <a href="#" class="cart-button-link">Перейти в корзину</a>-->
                    </div>`
});