<template>
  <v-col cols="12" style="border:none;">
    <v-row
      v-for="cita in citas"
      :key="cita.id"
      style="background-color: #FFF4EC; margin-top: 10px;"
    >
      <v-col cols="2" align="center" justify="center">
        <v-avatar
          size="80"
          color="black"
        />
      </v-col>
      <v-col cols="5">
        <h4><b>{{ cita.paciente.nombre }} {{ cita.paciente.apaterno }} {{ cita.paciente.amaterno }}</b></h4>
        <v-row class="ma-0">
          <p class="pacDatos1"><b>Age: {{ cita.paciente.edad }}</b></p> &nbsp;&nbsp;&nbsp;&nbsp;
          <p class="pacDatos1"><b>Sex: {{ cita.paciente.sexo }}</b></p>
        </v-row>
        <p class="pacDatos"><b>Phone Number: {{ cita.paciente.telefono }}</b></p>
        <p class="pacDatos"><b>E-mail: {{ cita.paciente.email }}</b></p>
        <p class="pacDatos"><b>Address: {{ cita.paciente.direccion }}</b></p>
      </v-col>
      <v-col cols="5">
        <!-- Mostrar información de la cita-->
        <p style="font-size:23px;">Token I'd {{ cita.id }}</p>
        <h2 style="margin-top:-7px;">{{ cita.doctor }}</h2>
        <v-row style="margin-top: 10px; margin-left: 1px;">
          <p style="font-size:15px;">{{ cita.fecha }}</p>&nbsp;&nbsp;&nbsp;
          <p style="font-size:15px;">{{ cita.hora }}</p>&nbsp;&nbsp;&nbsp;
          <p style="font-size:15px;">ROOM: {{ cita.consultorio }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      citas: [] // Aquí se almacenarán las citas obtenidas del servidor
    }
  },
  mounted () {
    this.loadCitas()
  },
  methods: {
    loadCitas () {
      const url = '/citas/get-all-citas'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.citas = res.data.citas
            this.$emit('cita-load')
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    handleCitaAdded () {
      this.loadCitas() // Llama a la función para cargar los pacientes
    }
  },
  created () {
    this.$on('cita-add', this.handleCitaAdded) // Escucha el evento 'pacient-added'
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
