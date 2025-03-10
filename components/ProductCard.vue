<template>
 
    <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <div class="mb-4 flex justify-center">
        <img :src="product.image" :alt="product.title" class="h-48 w-full object-contain" />
      </div>
      <div class="text-center">
        <NuxtLink :to="`/products/${product.id}`">
        <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">
          {{ product.title }}
        </h3>
        </NuxtLink>
        <p class="text-gray-600 mb-2 capitalize">
          {{ product.category }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold text-green-600">
            ${{ product.price.toFixed(2) }}
          </span>
          <div>
            <!-- Render quantity controls if already in cart; otherwise, show Add to Cart button -->
            <template v-if="quantityInCart === 0">
              <button 
                @click.stop="handleAddToCart"
                class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                </svg>
                Add to Cart
              </button>
            </template>
            <template v-else>
              <div class="flex items-center">
                <button 
                  @click.stop="decreaseQuantity" 
                  class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span class="mx-2">{{ quantityInCart }}</span>
                <button 
                  @click.stop="increaseQuantity" 
                  class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </template>
          </div>
        </div>
        <div class="flex justify-center items-center mt-2">
          <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034a1 1 0 01-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72a1 1 0 01.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-gray-600">
            {{ product.rating.rate }} ({{ product.rating.count }})
          </span>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const { product } = defineProps<{ product: any }>()
const cartStore = useCartStore()

// Compute how many of this product are in the cart
const quantityInCart = computed(() => {
  const item = cartStore.items.find(item => item.id === product.id)
  return item ? item.quantity : 0
})

// Add product to cart if not already added
const handleAddToCart = () => {
  const productToAdd = {
    id: product.id,
    title: product.title,
    price: product.price
  }
  cartStore.addToCart(productToAdd)
}

// Increase quantity (reuse addToCart function)
const increaseQuantity = () => {
  const productToAdd = {
    id: product.id,
    title: product.title,
    price: product.price
  }
  cartStore.addToCart(productToAdd)
}

// Decrease quantity, and if quantity reaches zero, remove product from cart
const decreaseQuantity = () => {
  const existingItem = cartStore.items.find(item => item.id === product.id)
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--
    } else {
      cartStore.removeFromCart(product.id)
    }
  }
}
</script>
