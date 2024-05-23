<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-img
            src="https://example.com/cancel-image.png"
            contain
            width="200"
          ></v-img>
          <h1>Pago Cancelado</h1>
          <p>Lo sentimos, parece que el pago no se completó. Por favor, inténtalo de nuevo.</p>
          <v-btn color="primary" @click="goHome">Volver a la página principal</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push('/dashboard/Orders')
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-top: 50px;
}
</style>
