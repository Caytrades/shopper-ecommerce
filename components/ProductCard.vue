<template>
  <NuxtLink :to="`/products/${product.id}`" class="block">
    <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <div class="mb-4 flex justify-center">
        <img :src="product.image" :alt="product.title" class="h-48 w-full object-contain" />
      </div>
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">
          {{ product.title }}
        </h3>
        <p class="text-gray-600 mb-2 capitalize">
          {{ product.category }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold text-green-600">
            ${{ product.price.toFixed(2) }}
          </span>
          <button 
            @click.stop="handleAddToCart"
            class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
            </svg>
            Add to Cart
          </button>
        </div>
        <div class="flex justify-center items-center mt-2">
          <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-gray-600">
            {{ product.rating.rate }} ({{ product.rating.count }})
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const { product } = defineProps<{ product: any }>()
const cartStore = useCartStore()

const handleAddToCart = () => {
  const productToAdd = {
    id: product.id,
    title: product.title,
    price: product.price
  }
  cartStore.addToCart(productToAdd)
}
</script>
