// ~/stores/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    // Each item stores the product id, title, price, and quantity
    items: [] as Array<{ id: number; title: string; price: number; quantity: number }>
  }),
  actions: {
    addToCart(product: { id: number; title: string; price: number }) {
      const item = this.items.find(item => item.id === product.id)
      if (item) {
        item.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    clearCart() {
      this.items = []
    }
  }
})
