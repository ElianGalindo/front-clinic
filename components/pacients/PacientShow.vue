<template>
  <v-row v-if="pacientes.length > 0">
    <v-card v-for="pacient in pacientes" :key="pacient.email" cols="12">
      <v-row>
        <p>{{ pacient.nombre }}</p>
        <p>Email: {{ pacient.email }}</p>
        <p>Edad: {{ pacient.edad }}</p>
      </v-row>
    </v-card>
  </v-row>
  <p v-else>Loding Pacients...</p>
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
