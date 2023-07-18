<template>
    <div class="product-container">
      <img class="product-image" :src="product.image_url">
      <div class="details-wrap">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.price }} VND</p>
        <p>Quantity: {{ product.quantity }}</p>
      </div>
      <button 
        class="remove-button"
        @click="$emit('remove-from-cart', product.product_id)"
      >Remove from cart</button>
    </div>
</template>
  

<script>
export default {
    name: 'ProductsListItem',
    props: ['product'],
}
</script>

<style scoped>
  .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
  }

  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
</style>