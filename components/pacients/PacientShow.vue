<template>
  <v-col cols="12" style="border:none;">
    <!--<v-card v-for="pacient in pacientes" :key="pacient.email" cols="12" style="background-color:#FFF4EC;">-->
    <v-row
      v-for="pacient in pacientes"
      :key="pacient.email"
      style="background-color: #FFF4EC; margin-top: 10px;"
    >
      <v-col cols="2" align="center" justify="center">
        <v-avatar
          size="80"
          color="black"
        />
      </v-col>
      <v-col cols="5">
        <h4><b>{{ pacient.nombre }} {{ pacient.apaterno }} {{ pacient.amaterno }}</b></h4>
        <v-row class="ma-0">
          <p class="pacDatos1"><b>Age: {{ pacient.edad }}</b></p> &nbsp;&nbsp;&nbsp;&nbsp;
          <p class="pacDatos1"><b>Sex: {{ pacient.sexo }}</b></p>
        </v-row>
        <p class="pacDatos"><b>Phone Number: {{ pacient.telefono }}</b></p>
        <p class="pacDatos"><b>E-mail: {{ pacient.email }}</b></p>
        <p class="pacDatos"><b>Address: {{ pacient.direccion }}</b></p>
      </v-col>
      <v-col cols="5">
        Aqui van las citas
      </v-col>
    </v-row>
   <!--</v-card>-->
  </v-col>
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
  },
  created () {
    this.$root.$on('pacient-added', () => {
      this.loadPacients()
    })
  }
}
</script>
<style scoped>
  .pacDatos{
    margin: 0;
    padding: 0;
    width: 300px;
    margin-top: -5px;
    font-size: 12px;
  }
  .pacDatos1{
    font-size: 16px;
  }
</style>
