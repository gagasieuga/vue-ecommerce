<template>
    <div id="page-wrap">
        <ProductsGrids :products="products"/>
    </div>
</template>

<script>
import axios from 'axios';
import ProductsGrids from '@/components/ProductGrids.vue';

export default {
    name: 'ProductsPage',
    components: {
      ProductsGrids,
    },
    data() {
        return {
            products : [], //initialize products as an empty array
        };
    },
    async created() {
        const result = await axios.get('/api/products');
        const products = result.data;
        this.products = products;
    }
}
</script>


