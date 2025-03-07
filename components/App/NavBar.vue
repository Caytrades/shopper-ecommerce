<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink 
        to="/" 
        class="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300"
      >
        Shopper
      </NuxtLink>

      <!-- Navigation Links -->
      <div class="hidden md:flex space-x-6">
        <NuxtLink 
          to="/" 
          class="text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/all_products" 
          class="text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          Products
        </NuxtLink>
        <NuxtLink 
          to="/categories" 
          class="text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          Categories
        </NuxtLink>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center space-x-4">
        <!-- Search Input -->
        <div class="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search products..." 
            class="pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>
        </div>

        <!-- Cart and User Icons -->
        <div class="flex space-x-4">
          <NuxtLink 
            to="/cart"
            class="relative hover:text-gray-900 text-gray-700"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span 
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
              {{ cartStore.items.length }}
            </span>
          </NuxtLink>
          <button class="hover:text-gray-900 text-gray-700">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-gray-700 hover:text-gray-900"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-md">
      <div class="px-4 pt-2 pb-4 space-y-2">
        <NuxtLink 
          to="/" 
          class="block py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/products" 
          class="block py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          Products
        </NuxtLink>
        <NuxtLink 
          to="/categories" 
          class="block py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          Categories
        </NuxtLink>
        <div class="pt-2">
          <input 
            type="text" 
            placeholder="Search products..." 
            class="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const cartStore = useCartStore()
</script>
