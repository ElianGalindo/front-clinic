<template>
  <v-app style="background-color:#FFF4EC; width:100%; margin-top: -20px;">
    <v-col cols="12">
      <!-- Buscador -->
      <v-row style="height:110px;">
        <v-col cols="8">
          <v-text-field
          width="100px"
          height="50px"
          style="margin-top:30px; margin-left: 50px;"
          label="Search"
          rounded
          outlined
          append-icon="mdi-magnify"
          />
        </v-col>
        <v-col>
          <v-img
            :src="require('assets/images/reloj.svg')"
            style="height: 30px; width: 30px; margin-top: 40px; margin-left: 50px;"
          />
        </v-col>
        <v-col>
          <v-btn @click="showAdd = true" style="background-color: rgb(22, 137, 22);">
            <span style="text-transform: none; color: white;">Add Product</span>
          </v-btn>
          <v-dialog v-model="showAdd" persistent transition="dialog-bottom-transition" width="400">
            <add-product @close="showAdd = false"/>
          </v-dialog>
        </v-col>
      </v-row>
      <!-- Productos -->
      <v-row style="margin-left: 50px;">
        <v-col
          v-for="producto in productos"
          :key="producto.id"
          cols="12"
          md="4"
        >
          <div class="cardCompleta">
            <div class="productoCard">
              <v-img
                v-if="producto.archivos && producto.archivos.length > 0"
                :src="producto.archivos[0]"
                style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto;"
              />
              <h4>{{ producto.nombre }}</h4>
              <p style="font-size: 12px;"><b>{{ producto.descripcion }}</b></p>
            </div>
            <v-row style="margin-top: 15px;">
              <v-col class="add1">
                <v-icon @click="removeFromCart(producto)">mdi-minus</v-icon>
              </v-col>
              <v-col class="add">
                <h3>{{ getProductQuantity(producto) }}</h3>
              </v-col>
              <v-col class="add">
                <v-icon @click="addToCart(producto)">mdi-plus</v-icon>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
       <!-- Carrito -->
       <v-row>
        <v-col cols="12">
          <h2>Carrito de Compras</h2>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="item in cart" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                <v-list-item-subtitle>Cantidad: {{ getProductQuantity(item) }}</v-list-item-subtitle>
                <v-list-item-subtitle>Precio: {{ item.precio }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <h3>Total: {{ getTotalPrice() }}</h3>
          <v-btn @click="pagarCarrito">Pagar</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-app>
</template>
<script>
// import Stripe from 'stripe'
import AddProduct from '~/components/products/AddProduct.vue'
export default {
  components: { AddProduct },
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      productos: [],
      cart: [],
      showAdd: false,
      search: ''
    }
  },
  mounted () {
    this.loadProductos()
  },
  methods: {
    loadProductos () {
      const url = '/products/get-all-products'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.productos = res.data.productos
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    addToCart (producto) {
      const index = this.cart.findIndex(item => item.id === producto.id)
      if (index !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        this.cart[index].cantidad++
      } else {
        // Si el producto no está en el carrito, agregarlo
        this.cart.push({ ...producto, cantidad: 1 })
      }
    },
    removeFromCart (producto) {
      // Agregar lógica para eliminar el producto del carrito
      const index = this.cart.findIndex(item => item.id === producto.id)
      if (index !== -1) {
        // Obtener la referencia al objeto del carrito
        const cartItem = this.cart[index]
        // Reducir la cantidad en 1 si la cantidad es mayor que 1
        if (cartItem.cantidad > 1) {
          cartItem.cantidad--
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          this.cart.splice(index, 1)
        }
      }
    },
    getProductQuantity (producto) {
      const cartItem = this.cart.find(item => item.id === producto.id)
      return cartItem ? cartItem.cantidad : 0
    },
    getTotalPrice () {
      // Calcular el precio total de los productos en el carrito
      return this.cart.reduce((total, item) => total + parseFloat(item.precio) * item.cantidad, 0)
    },
    async pagarCarrito () {
      try {
        const response = await this.$axios.post('/create-stripe-session', {
          carrito: this.cart
        })
        window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`
      } catch (error) {
        console.error('Error al iniciar el pago: ', error)
      }
    }
  }
}
</script>
<style scoped>
  .productoCard {
    width: 310px;
    height: 230px;
    border-radius: 24px;
    background-color: #F8000033;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .cardCompleta {
    width: 310px;
    height: 310px;
  }
  .add {
    margin-left: -50px;
  }
  .add1 {
    margin-left: 50px;
  }
</style>
