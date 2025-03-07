<template>
    <div class="mt-8">
      <!-- <h2 class="text-2xl font-bold mb-4">Related Products</h2> -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <NuxtLink 
          v-for="product in relatedProducts" 
          :key="product.id" 
          :to="`/products/${product.id}`"
          class="bg-white shadow rounded p-4 hover:shadow-lg transition"
        >
          <img 
            :src="product.image" 
            alt="Product Image" 
            class="w-full h-72 object-contain mb-2 border rounded-lg"
          />
          <h3 class="font-medium text-sm">{{ product.title }}</h3>
          <p class="text-green-600 font-bold text-sm">${{ product.price.toFixed(2) }}</p>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  
  interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
  }
  
  const props = defineProps<{ category: string; currentId: number }>()
  const relatedProducts = ref<Product[]>([])
  
  const fetchRelatedProducts = async () => {
    try {
      const products: Product[] = await $fetch('https://fakestoreapi.com/products')
      const filtered = products.filter(p => p.category === props.category && p.id !== props.currentId)
      const shuffled = filtered.sort(() => Math.random() - 0.5)
      relatedProducts.value = shuffled.slice(0, 3)
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }
  
  onMounted(() => {
    fetchRelatedProducts()
  })
  
  watch(
    () => [props.category, props.currentId],
    () => {
      fetchRelatedProducts()
    }
  )
  </script>
  