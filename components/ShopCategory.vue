<template>
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-6 text-center">Shop Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="category in categories" 
          :key="category"
          class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          @click="selectCategory(category)"
        >
          <div class="text-center">
            <h3 class="text-xl font-semibold text-gray-800 capitalize">
              {{ category }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const categories = ref([])
  
  const selectCategory = (category) => {
    // Emit an event or use navigation to filter products
    console.log(`Selected category: ${category}`)
  }
  
  onMounted(async () => {
    try {
      const uniqueCategories = [...new Set(
        await $fetch('https://fakestoreapi.com/products')
          .then(products => products.map(product => product.category))
      )]
      categories.value = uniqueCategories
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  })
  </script>