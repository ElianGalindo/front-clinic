<template>
  <v-row>
    <v-app style="background-color:#FFF4EC; width:100%; margin-top: -20px;">
      <v-col cols="12">
        <!-- aqui se encuentra el buscador y reloj -->
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
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row v-for="paciente in pacientes" :key="paciente.email">
            <!-- Aqui va la imagen del paciente -->
            <v-col>
              <div class="imgPaciente">
                <v-img
                  :src="require('@/assets/images/paciente.png')"
                  style="width: 260px; height:158px;"
                />
              </div>
            </v-col>
            <!-- Aqui va la informacion del paciente -->
            <v-col>
              <h4><b>{{ paciente.nombre }} {{ paciente.apaterno }} {{ paciente.amaterno }}</b></h4>
              <v-row class="ma-0">
                <p class="pacDatos1"><b>Age: {{ paciente.edad }}</b></p> &nbsp;&nbsp;&nbsp;&nbsp;
                <p class="pacDatos1"><b>Sex: {{ paciente.sexo }}</b></p>
              </v-row>
              <p class="pacDatos"><b>Phone Number: {{ paciente.telefono }}</b></p>
              <p class="pacDatos"><b>E-mail: {{ paciente.email }}</b></p>
              <p class="pacDatos"><b>Address: {{ paciente.direccion }}</b></p>
            </v-col>
            <!-- Aqui va la imagen de sus datos -->
            <v-col>
              <div>
                <v-img
                :src="require('@/assets/images/datos.svg')"
                style="width:330px; height: 150px;"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      </v-col>
    </v-app>
  </v-row>
</template>
<script>
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      pacientes: []
    }
  },
  mounted () {
    this.loadPacientes()
  },
  methods: {
    loadPacientes () {
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
<style scoped>
  .imgPaciente {
    border-radius: 24px;
    width: 260px;
    height: 158px;
    margin-left: 70px;
  }
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
