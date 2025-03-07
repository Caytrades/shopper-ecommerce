<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6 text-center">Your Cart</h2>
    <div v-if="cartItems.length === 0">
      <p class="text-center text-gray-600">Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border">
          <thead>
            <tr class="bg-gray-100 border-b">
              <th class="text-left py-3 px-4">Product</th>
              <th class="text-left py-3 px-4">Unit Price</th>
              <th class="text-left py-3 px-4">Quantity</th>
              <th class="text-left py-3 px-4">Subtotal</th>
              <th class="text-left py-3 px-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cartItems"
              :key="item.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 px-4 flex items-center">
                <!-- Will come back here to figure out how to add an image -->
                <div class="ml-2 font-medium">{{ item.title }}</div>
              </td>
              <td class="py-3 px-4">
                ${{ item.price.toFixed(2) }}
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="decreaseQuantity(item)"
                    class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item)"
                    class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="py-3 px-4">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </td>
              <td class="py-3 px-4">
                <button
                  @click="removeItem(item.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 text-right">
        <p class="text-xl font-bold">
          Total: ${{ totalPrice.toFixed(2) }}
        </p>
        <button
          @click="checkout"
          class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() =>
  cartStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

const removeItem = (id: number) => {
  cartStore.removeFromCart(id)
}

const increaseQuantity = (item: { id: number; title: string; price: number; quantity: number }) => {
  cartStore.addToCart({ id: item.id, title: item.title, price: item.price })
}

const decreaseQuantity = (item: { id: number; title: string; price: number; quantity: number }) => {
  if (item.quantity > 1) {
    const existingItem = cartStore.items.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity--
    }
  } else {
    removeItem(item.id)
  }
}

const checkout = async () => {
  try {
    const payload = {
      userId: 1, // Will come back here when I setup the login
      date: new Date().toISOString(),
      products: cartStore.items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    }
    const response = await $fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    console.log('Checkout response:', response)
    cartStore.clearCart()
  } catch (error) {
    console.error('Checkout error:', error)
  }
}
</script>
