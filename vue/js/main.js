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
                <p v-else :class="{ disabledStock: !inStock }" class="OutofStock">Out of Stock</p>
                <p v-else>Out of Stock</p>
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
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>{{ review.answer }}</p>
                </li>
            </ul>
        </div>
        <product-review @review-submitted="addReview"></product-review>
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
            reviews: [],
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
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
    <form class="review-form" @submit.prevent="onSubmit">
    
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>
    
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
    <h3>Would you recommend this product?</h3>
    <input type="radio" value="Yes!" v-model="answer" name="question">
    <label id="yes">Yes!</label>
    <input type="radio" value="No!" v-model="answer" name="question">
    <label id="no">No!</label>
 <p>
   <input type="submit" value="Submit"> 
 </p>
 



</form>
 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            answer: 0,
            errors: [],
        }
        },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating && this.answer) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    answer: this.answer,
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.answer = null
            }
            else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.answer) this.errors.push("Select an answer option.")

            }
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

