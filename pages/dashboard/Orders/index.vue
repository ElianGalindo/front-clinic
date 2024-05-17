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
                <v-icon>mdi-minus</v-icon>
              </v-col>
              <v-col class="add">
                <h3>Add</h3>
              </v-col>
              <v-col class="add">
                <v-icon>mdi-plus</v-icon>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-app>
</template>
<script>
import AddProduct from '~/components/products/AddProduct.vue'
export default {
  components: { AddProduct },
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      productos: [],
      showAdd: false
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
    created () {
      this.$root.$on('product-added', () => {
        this.loadPacients()
      })
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
