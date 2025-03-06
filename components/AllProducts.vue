<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6 text-center">All Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '~/components/ProductCard.vue'

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

// Let's annotate the products ref with the Product type
const products = ref<Product[]>([])

onMounted(async () => {
  try {
    products.value = await $fetch('https://fakestoreapi.com/products')
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>
