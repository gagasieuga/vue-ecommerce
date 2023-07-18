<template>
    <div id="page-wrap" v-if="product">
        <div class="img-wrap">
            <img v-bind:src="product.image_url"/>
        </div>
        <div id="product-details">
            <h1>{{ product.product_name }}</h1>
            <h3 id="price">{{ product.price }} VND</h3>
            <p>Average rating: {{ product.average_rating }}</p>
            <button id="add-to-cart" @click="addToCart">Add to cart</button>
            <h4>Description</h4>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <NotFoundPage v-else />   
</template>

<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';

export default {
    name: 'ProductDetailPage',
    components: {
      NotFoundPage,
    },
    data(){
        return {
            product: {}, 
        }
    },
    methods: {
        async addToCart() {
            await axios.post('/api/users/1/cart', {
                productId: this.$route.params.id,
            });
            alert('Added to cart');
        }
    },
    async created () {
        const result = await axios.get(`/api/products/${this.$route.params.id}`);
        const product = result.data;
        this.product = product;
    }
}
</script>

<style scoped>
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }
</style>
