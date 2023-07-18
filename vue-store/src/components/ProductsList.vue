<template>
    <div v-if="products.length > 0">  
        <ProductsListItem
        v-for="product in products"
        v-on:remove-from-cart="$emit('remove-from-cart', $event)"
        :key="product.product_id"
        :product="product" />
    </div>
    <p v-else>You have no items in your cart</p>
</template>

<script>
import ProductsListItem from './ProductsListItem.vue';
export default {
    name: 'ProductsList',
    components: {
        ProductsListItem,
    },
    props: ['products'],
}
</script>