<template>
    <div class="container mx-auto px-4 py-8">
      <div v-if="product" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Breadcrumb navigation -->
        <div class="px-6 py-3 bg-gray-50">
          <div class="flex items-center text-sm text-gray-500">
            <span>Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span>{{ product.category }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="font-medium truncate max-w-xs">{{ product.title }}</span>
          </div>
        </div>
  
        <div class="flex flex-col md:flex-row">
          <!-- Left: Image display with thumbnails -->
          <div class="md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50">
            <!-- Main image -->
            <div class="relative w-full h-80 flex items-center justify-center overflow-hidden group">
              <img 
                :src="currentImage" 
                alt="Product Image" 
                class="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <!-- Thumbnail container -->
            <div class="flex mt-6 space-x-3 justify-center">
              <div 
                v-for="(img, index) in images" 
                :key="index"
                class="relative w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:shadow-md"
                :class="currentImage === img ? 'border-blue-500 shadow-md' : 'border-gray-200'"
                @click="currentImage = img"
              >
                <img 
                  :src="img"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
      
          <!-- Right: Product details -->
          <div class="md:w-1/2 p-8">
            <!-- Header section -->
            <div class="border-b border-gray-100 pb-4">
              <span class="text-sm font-medium text-blue-600 uppercase tracking-wider">{{ product.category }}</span>
              <h1 class="text-3xl font-bold text-gray-800 mt-1 mb-2">{{ product.title }}</h1>
              
              <!-- Rating Section -->
              <div class="flex items-center mb-4">
                <div class="flex">
                  <template v-for="n in 5">
                    <svg 
                      v-if="n <= fullStars" 
                      :key="`full-${n}`"
                      xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-yellow-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor">
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462a1 1 0 01.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292a1 1 0 01-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034a1 1 0 01-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72a1 1 0 01.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/>
                    </svg>
                    <svg 
                      v-else-if="n === fullStars + 1 && halfStar" 
                      :key="`half-${n}`"
                      xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-yellow-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462a1 1 0 01.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292a1 1 0 01-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034a1 1 0 01-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72a1 1 0 01.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                    <svg 
                      v-else 
                      :key="`empty-${n}`"
                      xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-gray-300" 
                      viewBox="0 0 20 20" 
                      fill="currentColor">
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462a1 1 0 01.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292a1 1 0 01-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034a1 1 0 01-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72a1 1 0 01.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/>
                    </svg>
                  </template>
                </div>
                <span class="ml-2 text-gray-600">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</span>
              </div>
            </div>
  
            <!-- Price and availability -->
            <div class="my-6">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-3xl font-bold text-grey-600">${{ product.price.toFixed(2) }}</p>
                  <p class="text-sm text-gray-500 mt-1">
                    <span class="text-green-500">●</span> In stock
                  </p>
                </div>
                <div class="bg-green-50 px-3 py-1 rounded-full">
                  <p class="text-green-600 text-sm font-medium">✓ Free shipping</p>
                </div>
              </div>
            </div>
  
            <!-- Product Description -->
            <div class="mb-6">
              <h3 class="text-sm uppercase font-medium text-gray-500 mb-2">Description</h3>
              <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
            </div>
  
            <!-- Add to Cart / Quantity Controls  -->
            <div class="mb-6">
              <h3 class="text-sm uppercase font-medium text-gray-500 mb-3">Quantity</h3>
              <div class="flex items-center">
                <button 
                  @click="decreaseQuantity" 
                  class="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  :disabled="quantityInCart === 0"
                  :class="{'opacity-50 cursor-not-allowed': quantityInCart === 0}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <div class="h-10 w-16 border-t border-b border-gray-300 flex items-center justify-center text-gray-700">
                  {{ quantityInCart }}
                </div>
                <button 
                  @click="increaseQuantity" 
                  class="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
  
            <!-- Action buttons -->
            <div class="flex space-x-4 mb-8">
              <button 
                @click="handleAddToCart" 
                class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                </svg>
                {{ quantityInCart === 0 ? 'Add to Cart' : 'Update Cart' }}
              </button>
              
              <button class="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
      
            <!-- Additional Info Section -->
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="text-sm uppercase font-medium text-gray-500 mb-3">Shipping & Returns</h3>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">Product is cancellable until out for delivery</span>
                </div>
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293a1 1 0 00-1.414 1.414L8.586 11l-2.293 2.293a1 1 0 001.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11l2.293-2.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">Non-Returnable</span>
                </div>
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-gray-700">Delivery estimate: 3-5 business days</span>
                </div>
              </div>
            </div>
      
            <!-- Share Product Section -->
            <div>
              <h3 class="text-sm uppercase font-medium text-gray-500 mb-3">Share Product</h3>
              <div class="flex items-center space-x-4">
                <!-- WhatsApp -->
                <a 
                  :href="whatsappLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.49 11.49 0 0012 0C5.38 0 0 5.38 0 12c0 2.1.55 4.08 1.53 5.82L0 24l6.3-1.65A11.45 11.45 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.09a9.09 9.09 0 01-4.65-1.35l-.33-.2-3.75.98.99-3.66-.22-.37A9.05 9.05 0 012.91 12c0-5 4.09-9.09 9.09-9.09s9.09 4.09 9.09 9.09-4.09 9.09-9.09 9.09z"/>
                    <path d="M16.11 14.24c-.27-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.69.88-.85 1.06-.16.18-.33.2-.61.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.61-1.5-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.33.4-.5.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.03-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 2.03 3.1 4.93 4.35.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.59-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.07-.12-.25-.18-.53-.32z"/>
                  </svg>
                </a>
                <!-- Telegram -->
                <a 
                  :href="telegramLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.95 8.62l-1.97 9.27c-.15.68-.55.84-1.12.53l-3.11-2.29-1.5 1.44c-.17.17-.31.31-.63.31l.23-3.32 6.03-5.46c.26-.23-.06-.36-.4-.13l-7.46 4.69-3.21-1c-.7-.22-.72-.7.15-1.03l12.55-4.85c.58-.22 1.08.14.89 1.05z"/>
                  </svg>
                </a>
                <!-- Facebook -->
                <a 
                  :href="facebookLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.337v21.326C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.098 2.797.142v3.24l-1.918.001c-1.505 0-1.797.716-1.797 1.765v2.315h3.588l-.467 3.622h-3.121V24h6.116c.728 0 1.325-.597 1.325-1.337V1.337C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
                <!-- Copy Link -->
                <button 
                  @click="copyLink" 
                  class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <!-- Link copied notification -->
                <div v-if="linkCopied" class="ml-2 text-sm text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Link copied!
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <!-- Related Products -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <RelatedProducts :category="product.category" :currentId="product.id" />
        </div>
      </div>
      
      <!-- Loading state with skeleton -->
      <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <div class="animate-pulse">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2 p-6">
              <div class="bg-gray-200 h-80 w-full rounded-lg"></div>
              <div class="flex mt-6 space-x-3">
                <div class="bg-gray-200 h-16 w-16 rounded-lg"></div>
                <div class="bg-gray-200 h-16 w-16 rounded-lg"></div>
                <div class="bg-gray-200 h-16 w-16 rounded-lg"></div>
              </div>
            </div>
            <div class="md:w-1/2 p-8">
              <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div class="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div class="h-12 bg-gray-200 rounded w-full mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
      
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCartStore } from '~/stores/cart'
    
  const route = useRoute()
  const productId = route.params.id as string
    
  const product = ref<any>(null)
  const currentImage = ref<string>('')
  const linkCopied = ref<boolean>(false)
    
  const cartStore = useCartStore()
    
  const fetchProduct = async () => {
    try {
      product.value = await $fetch(`https://fakestoreapi.com/products/${productId}`)
      if (product.value) {
        currentImage.value = product.value.image
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    }
  }
      
  onMounted(() => {
    fetchProduct()
  })
    
  const images = computed(() => {
    if (product.value) {
      if (product.value.images && product.value.images.length > 1) {
        return product.value.images
      }
      return [product.value.image]
    }
    return []
  })
      
  const quantityInCart = computed(() => {
    const item = cartStore.items.find(item => item.id === product.value?.id)
    return item ? item.quantity : 0
  })
      
  const handleAddToCart = () => {
    if (product.value) {
      cartStore.addToCart({
        id: product.value.id,
        title: product.value.title,
        price: product.value.price
      })
    }
  }
      
  const increaseQuantity = () => {
    if (product.value) {
      cartStore.addToCart({
        id: product.value.id,
        title: product.value.title,
        price: product.value.price
      })
    }
  }
      
  const decreaseQuantity = () => {
    if (product.value) {
      const existingItem = cartStore.items.find(item => item.id === product.value.id)
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--
        } else {
          cartStore.removeFromCart(product.value.id)
        }
      }
    }
  }
      
  const fullStars = computed(() => {
    if (product.value && product.value.rating && product.value.rating.rate) {
      return Math.floor(product.value.rating.rate)
    }
    return 0
  })
  
  const halfStar = computed(() => {
    if (product.value && product.value.rating && product.value.rating.rate) {
      return (product.value.rating.rate - Math.floor(product.value.rating.rate)) >= 0.5
    }
    return false
  })
      
  const currentUrl = computed(() => (typeof window !== 'undefined' ? window.location.href : ''))
  const whatsappLink = computed(() => `https://api.whatsapp.com/send?text=Check out this product: ${currentUrl.value}`)
  const telegramLink = computed(() => `https://t.me/share/url?url=${currentUrl.value}&text=Check out this product!`)
  const facebookLink = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${currentUrl.value}`)
      
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl.value)
      linkCopied.value = true
      setTimeout(() => {
        linkCopied.value = false
      }, 2000)
    } catch (error) {
      console.error("Error copying link:", error)
    }
  }
  </script>