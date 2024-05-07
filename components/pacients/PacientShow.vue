<template>
  <v-row>
      <!-- Aquí va la tarjeta para mostrar la información del paciente -->
    <v-card v-for="pacient in pacientes" :key="pacient.email" cols="12" sm="6" md="4">
      <v-row>
        <v-card-title>{{ pacient.nombre }}</v-card-title>
        <v-card-text>
          <p>Email: {{ pacient.email }}</p>
          <p>Edad: {{ pacient.edad }}</p>
          <!-- Agrega aquí más campos si es necesario -->
        </v-card-text>
      </v-row>
    </v-card>
  </v-row>
  <!--<p v-else>Loding Pacients...</p>-->
</template>

<script>
export default {
  data () {
    return {
      pacientes: [] // Aquí se almacenarán los pacientes obtenidos del servidor
    }
  },
  mounted () {
    // Aquí podrías llamar a un método para cargar la lista de pacientes desde el servidor
    this.loadPacients()
  },
  methods: {
    loadPacients () {
      const url = '/pacients/get-all-pacients'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.pacientes = res.data.pacients
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    }
  }
}
</script>
