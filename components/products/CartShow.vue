<template>
  <v-card>
    <v-card-title>
      <span class="headline">Shopping Cart</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row v-if="cartItems.length">
        <v-col v-for="item in cartItems" :key="item.productId" cols="12" md="4">
          <div class="cart-item">
            <v-img
              v-if="item.archivo"
              :src="item.archivo"
              style="width: 100px; height: 100px; border-radius: 50%;"
            />
            <h4>{{ item.nombre }}</h4>
            <p><b>Quantity: </b>{{ item.quantity }}</p>
            <v-btn @click="updateQuantity(item.productId, item.quantity - 1)">-</v-btn>
            <v-btn @click="updateQuantity(item.productId, item.quantity + 1)">+</v-btn>
            <v-btn @click="removeItem(item.productId)">Remove</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <p>No items in cart.</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateQuantity (productId, quantity) {
      if (quantity < 1) {
        this.removeItem(productId)
        return
      }
      const url = `/cart/update-cart-item/${productId}`
      this.$axios.post(url, { quantity })
        .then((res) => {
          if (res.data.message === 'success') {
            this.$emit('update-cart', res.data.cart.items)
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    removeItem (productId) {
      const url = `/cart/remove-from-cart/${productId}`
      this.$axios.post(url)
        .then((res) => {
          if (res.data.message === 'success') {
            this.$emit('update-cart', res.data.cart.items)
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
