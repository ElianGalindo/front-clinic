<template>
  <v-col cols="12">
    <v-row class="medicamento" v-for="medicina in medicinas" :key="medicina.id">
      <v-row style="margin-top:10px;">
        <v-col cols="10">
          <p class="datos"><b>Nombre: </b>{{ medicina.nombre }}</p>
          <p class="datos"><b>Precio: </b>{{ medicina.precio }}</p>
        </v-col>
        <v-col cols="2">
          <v-icon style="margin-top: 15px;">mdi-dots-vertical</v-icon>
        </v-col>
      </v-row>
    </v-row>
  </v-col>
</template>
<script>
export default {
  data () {
    return {
      medicinas: []
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
            this.medicinas = res.data.productos
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
  .medicamento {
    width: 270px;
    height: 74px;
    background-color: #FFC198;
    margin-bottom: 15px;
    border-radius: 20px;
  }
  .datos {
    font-size: 15px;
    margin-bottom: -3px;
    margin-left: 15px;
  }
</style>
