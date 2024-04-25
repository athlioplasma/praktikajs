Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="css/main.css">

    <script defer src="js/vue.js"></script>
    <script defer src="js/main.js"></script>

    <title>Product App</title>
</head>
<body>

<div id="app">
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>

        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{onSale}}</p>
            <a :href="link">More products like this</a>
            <div>
                <p v-if="inStock">In Stock</p>
                <p :disabled="!OutofStock" :class="{ OutofStock: !OutofStock }" v-else="inStock">Out Of Stock</p>
            </div>

            <div>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
            </div>

            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>

            <div>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
            </div>
            
            <p>User is premium: {{ premium }}</p>

            <div class="cart">
                <p>Cart({{ cart }})</p>
                <div>
                    <button class="reducefromcart" v-on:click="reduceFromCart">Reduce from cart</button>
                </div>
            </div>

                <button class="addtocart" v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>

            </div>
        </div>
    </div>
</div>

</body>
</html>
   </div>
 `,

    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            sale: "On Sale!",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        reduceFromCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            if(this.inventory <= 30) {
                return this.sale
            }
            else return " "
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})

