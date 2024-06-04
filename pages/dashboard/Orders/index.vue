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
          <!-- Boton para agregar producto -->
          <v-btn @click="showAdd = true" style="background-color: rgb(22, 137, 22);">
            <span style="text-transform: none; color: white;">Add Product</span>
          </v-btn>
          <!-- Boton para mostrar carrito -->
          <v-btn @click="showCarrito = true" style="background-color: rgb(22, 137, 22);">
            <span style="text-transform: none; color: white;">Shop <v-icon>mdi-cart-outline</v-icon></span>
          </v-btn>
          <v-dialog v-model="showAdd" persistent transition="dialog-bottom-transition" width="400">
            <add-product @close="showAdd = false" @agregar-producto="loadProductos"/>
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
      <v-dialog v-model="showCarrito" transition="dialog-bottom-transition" width="500">
        <v-card style="background-color:#FFDEC8;">
          <v-card-title style="text-align: center; justify-content: center;">
            Tus compras
          </v-card-title>
          <v-card-text>
            <v-col cols="12" v-for="item in cart" :key="item.id">
              <v-row>
                <v-col cols="3">
                  <v-img
                    v-if="item.archivos && item.archivos.length > 0"
                    :src="item.archivos[0]"
                    style="width: 60px; height: 60px;"
                  />
                </v-col>
                <v-col cols="6">
                  <p><b>{{ item.nombre }}</b></p>
                  <p>{{ item.descripcion }}</p>
                  <p><b>Cantidad:</b> {{ getProductQuantity(item) }}</p>
                </v-col>
                <v-col cols="3">
                  <p><b>${{ item.precio }}</b></p>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-card-text>
          <v-card-actions style="align-items: center; justify-content: center;">
            <v-btn @click="pagarCarrito" color="green" block>
              <span style="text-transform: none;">Pagar</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-app>
</template>
<script>
import { loadStripe } from '@stripe/stripe-js'
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
      showCarrito: false,
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
        this.cart[index].cantidad++
      } else {
        this.cart.push({ ...producto, cantidad: 1 })
      }
    },
    removeFromCart (producto) {
      const index = this.cart.findIndex(item => item.id === producto.id)
      if (index !== -1) {
        const cartItem = this.cart[index]
        if (cartItem.cantidad > 1) {
          cartItem.cantidad--
        } else {
          this.cart.splice(index, 1)
        }
      }
    },
    getProductQuantity (producto) {
      const cartItem = this.cart.find(item => item.id === producto.id)
      return cartItem ? cartItem.cantidad : 0
    },
    getTotalPrice () {
      return this.cart.reduce((total, item) => total + parseFloat(item.precio) * item.cantidad, 0)
    },
    async pagarCarrito () {
      const stripe = await loadStripe('pk_test_51PHDADRxhro7mv4NzuaK8XWwETrOscnG5UTntaBHdHdn5B5aRvScRdWM4QYtuPlthKGrkYQNeEaFn8B9ZNQ58m2h00vE7b2dXJ')
      try {
        const response = await this.$axios.post('/create-stripe-session', {
          cartItems: this.cart
        })
        const sessionId = response.data.id
        const { error } = await stripe.redirectToCheckout({ sessionId })

        if (error) {
          console.error('Error during checkout:', error)
        }
      } catch (error) {
        console.error('Error creating checkout session:', error)
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
