Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
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

            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>
            
            <product-details></product-details>

            <div>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
            </div>
            
            <p>Shipping: {{ shipping }}</p>
            

            
            <div class="cartbuttons">
                <button class="addtocart" v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                <button class="reducefromcart" v-on:click="delFromCart">Reduce from cart</button>
            </div>
        </div>
        <form class="review-form" @submit.prevent="onSubmit">
             <p>
               <label for="name">Name:</label>
               <input id="name" v-model="name" placeholder="name">
             </p>
            
             <p>
               <label for="review">Review:</label>
               <textarea id="review" v-model="review"></textarea>
             </p>
            
             <p>
               <label for="rating">Rating:</label>
               <select id="rating" v-model.number="rating">
                 <option>5</option>
                 <option>4</option>
                 <option>3</option>
                 <option>2</option>
                 <option>1</option>
               </select>
             </p>
            
             <p>
               <input type="submit" value="Submit"> 
             </p>
        </form>

    </div>
 `,

    data() {
        return {
            name: null,
            review: null,
            rating: null,

            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            sale: "On Sale!",
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
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        delFromCart() {
            this.$emit('del-from-cart');
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
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            if (this.inventory <= 30) {
                return this.sale
            } else return " "
        }, shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },

    }
})

Vue.component('product-details', {
    template: `
        <div>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
 `,

    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
})

Vue.component('product-review', {
    template: `
    <input v-model="name"> `,
    data() {
        return {
            name: null
        }
    },
    methods:{
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },

    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        updateDelCart(id) {
            this.cart.pop(id);
        }
    }

})

