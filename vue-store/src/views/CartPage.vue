<template>
    <div id="page-wrap">
        <h1>Shopping Cart</h1>
        <ProductList 
          :products="cartItems"
          v-on:remove-from-cart="removeFromCart($event)"/>
        <h3 id="total-price">Total: {{ totalPrice }} VND</h3>
        <button class="checkout-button" @click="checkOut">Checkout</button>
    </div>
</template>
<script>
import axios from 'axios';
import ProductList from '../components/ProductsList.vue';
export default {
    name: 'CartPage',
    components: {
       ProductList
    },
    data() {
        return {
            cartItems: [],
        }
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + Number(item.price * item.quantity), 0);
        },
        userId(){
            return this.$store.state.userId;
        }
    },
    methods: {
        async removeFromCart(productId) {
            const result = await axios.delete(`/api/users/1/cart/${productId}`);
            this.cartItems = result.data
        },
        async checkOut(){
          if (this.cartItems.length === 0) {
            alert('Your cart is empty');
            return;
          }
          else if (this.userId === null) {
            alert('Please login to checkout');
            return;
          }
          else{
            await axios.post(`/api/users/${this.userId}/cart/checkout`, this.cartItems);
            this.cartItems = [];
            alert('Checkout successfully');
          }
        }
    },
    async created () {
      const result = await axios.get('/api/users/1/cart');
      const cartItems = result.data.cart;
      this.cartItems = cartItems;
    }
}
</script>


<style scoped>
  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #checkout-button {
    width: 100%;
  }


</style>
