<template>
  <v-col cols="12">
    <!-- en este renglon estan los botones de citas -->
    <v-row style="margin:10px;">
      <v-btn class="btnCitas" @click="loadCitas">
        <span class="nomBtn">All Schedule</span>
      </v-btn>
      <v-btn class="btnCitas" @click="mostrarCitas('2024-06-06')">
        <span class="nomBtn">Yesterday Schedule</span>
      </v-btn>
      <v-btn class="btnCitas" @click="mostrarCitas('2024-06-07')">
        <span class="nomBtn">Today Schedule</span>
      </v-btn>
      <v-btn class="btnCitas" @click="mostrarCitas('2024-06-08')">
        <span class="nomBtn">Tomorrow Schedule</span>
      </v-btn>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        style="border:none; height: 410px;"
        class="overflow-y-auto"
      >
        <v-row
          v-for="cita in citas"
          :key="cita.id"
          style="background-color: #FFF4EC; margin-top: 10px;"
        >
          <v-col cols="2" align="center" justify="center">
            <v-img
              v-if="cita.paciente.archivos && cita.paciente.archivos.length > 0"
              :src="cita.paciente.archivos[0]"
              style="width: 80px; height: 80px; border-radius: 50%;"
            />
            <v-img
              v-else
              :src="require('@/assets/images/paciente.png')"
              style="width: 80px; height:80px; border-radius: 50%;"
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
    /* this.$parent.$on('citaAgregada', () => {
      this.loadCitas()
    }) */
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
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    mostrarCitas (dia) {
      const url = `/citas/get-citas-por-dia/${dia}`
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.citas = res.data.citas
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
  .btnCitas{
    background-color: transparent!important;
    color: black;
    width: auto;
    height: 35px;
    border-radius: 24px;
    background-color: none;
    margin-left: 30px;
    border: 1px solid black;
  }
  .nomBtn{
    font-family:Arial, Helvetica, sans-serif;
    text-transform: none;
  }
  /* Estilos para la barra de desplazamiento */
  ::-webkit-scrollbar {
    width: 8px; /* Ancho de la barra de desplazamiento */
    background-color: transparent; /* Color de fondo */
    visibility: hidden;
  }
  /* Estilos para el "pulgar" de la barra de desplazamiento */
  ::-webkit-scrollbar-thumb {
    background-color: #FFF4EC; /* Color del "pulgar" */
    border-radius: 4px; /* Radio de borde */
  }

  /* Estilos para el "pulgar" cuando se está moviendo */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #999; /* Color del "pulgar" al pasar el mouse sobre él */
  }

  /* Estilos para el "pulgar" cuando se está arrastrando */
  ::-webkit-scrollbar-thumb:active {
    background-color: #666; /* Color del "pulgar" al arrastrarlo */
  }
</style>
