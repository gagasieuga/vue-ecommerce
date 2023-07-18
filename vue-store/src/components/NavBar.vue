<template>
  <div id="nav-bar">
    <router-link to="/products" id="products-link">
      <h1>BE SHOES NICKER</h1>
    </router-link>
    <router-link to="/cart" id="cart-link">
      <button class="cart-button">Shopping Cart</button>
    </router-link>
    <div v-if="auth" @click="logout" id="logout-link">
      <button class="cart-button">Log out</button>
    </div>
    <router-link v-else to="/login" id="login-link">
      <button class="cart-button">Login</button>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
      return {
        authenticated: false,
      };
    },
    computed: {
      auth() {
          return this.$store.state.authenticated;
      },
      userId(){
        return this.$store.state.userId;
      }
    },
    methods: {
      test() {
        console.log(this.auth);
        console.log(this.authenticated);
        console.log(this.userId)
      },
      logout(){
        this.$store.commit('setAuthenticated', false);
        this.$store.commit('setUserId', null);
        this.$router.push('/login');
      }
    }
}

</script>

<style scoped>
  #nav-bar {
    border-bottom: 1px solid #ddd;
    height: 75px;
    width: 100%;
  }

  #products-link {
    text-align: center;
    display: block;
    color: black;
    font-size: 22px;
    left: 32px;
    position: absolute;
    top: 16px;
    text-decoration: none;
  }

  #product-link h1:hover {
    text-decoration: underline;
    color: #ddd;
  }

  #products-link h1 {
      margin: 0;
  }

  #cart-link {
    position: absolute;
    right: 16px;
    top: 16px;
  }
  #login-link {
    position: absolute;
    right: 180px;
    top: 16px;
  }
  #logout-link {
    position: absolute;
    right: 180px;
    top: 16px;
  }
.cart-button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    padding: 16px;
    transition: 350ms linear;
    background: linear-gradient(to left, black 50%, #42b983 50%); /* Background gradient */
    background-size: 200% 100%; /* Double the width of the gradient */
    background-position: right bottom; /* Start the gradient from the right side */
  }
  .cart-button:hover{
    border: #ddd;
    background-position: left bottom
  }
  .cart-button:active {
    transform: scale(0.85); /* Add scale transformation when the button is clicked */
  }
</style>
