<template>
  <v-app style="background-color:#FFF4EC; width:100%; margin-top: -20px;">
    <v-col cols="12">
      <!-- Buscador y boton para cerrar sesion -->
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
          <!-- Boton para cerrar sesion -->
          <v-btn @click="signUp" style="background-color: red; margin-top: 35px;">
            <span style="text-transform: none; color: white;">Sign-Up</span>
          </v-btn>
        </v-col>
      </v-row>
      <!-- Informacion del dashboard -->
      <v-row style="margin-left:50px;">
        <v-col cols="3">
          <p><b>Upcoming appointment</b></p>
          <div class="citaContainer" v-if="citaMasReciente">
            <v-col cols="12">
              <v-row>
                <v-col cols="3">
                  <v-img
                    style="width: 50px; height: 50px; border: 50%;"
                    v-if="citaMasReciente.doctor.archivos && citaMasReciente.doctor.archivos.length > 0"
                    :src="citaMasReciente.doctor.archivos[0]"
                  />
                </v-col>
                <v-col cols="9">
                  <p><b>Dr. {{ citaMasReciente.doctor.nombre }}</b></p>
                  <p style="margin-top: -10px;">{{ citaMasReciente.doctor.email }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p style="font-size: 13px;"><b>Date </b>{{ citaMasReciente.fecha }}</p>
                </v-col>
                <v-col>
                  <p style="font-size: 13px;"><b>Time </b>{{ citaMasReciente.hora }}</p>
                </v-col>
              </v-row>
              <v-row style="margin-top: -15px;">
                <v-col>
                  <p style="font-size: 13px;"><b>Address </b>{{ citaMasReciente.paciente.direccion }}</p>
                </v-col>
              </v-row>
            </v-col>
          </div>
        </v-col>
        <v-col cols="9">
          <p><b>News</b></p>
          <div class="noticiaContainer overflow-y-auto" >
            <noticias-view />
          </div>
        </v-col>
      </v-row>
      <!-- Informacion del dashboard 2 -->
      <v-row style="margin-left:50px;">
        <v-col cols="3">
          <p><b>Medication</b></p>
          <div class="medicationContainer">
            <medication-view />
          </div>
        </v-col>
        <v-col cols="9">
          <p><b>Information</b></p>
          <div class="infoContainer">
            <v-col cols="12">
              <h2>Healthy People</h2>
              <p class="infoText">Hi and welcome to this clinic. At Healthy People, we are committed to and care about providing good service to our patients.</p>
              <h4>On this page you can... </h4>
              <p class="infoText">-Register, edit and delete appointments at your clinic </p>
              <p class="infoText">-Register, edit and delete patients at your clinic, as well as create prescriptions and notes for your patients</p>
              <p class="infoText">-Add medicine and purchase your necessary medications online</p>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-app>
</template>
<script>
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      citas: [],
      citaMasReciente: null
    }
  },
  mounted () {
    this.loadCitas()
  },
  methods: {
    signUp () {
      this.$router.push('/')
    },
    loadCitas () {
      const url = '/citas/get-all-citas'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.citas = res.data.citas
            this.obtenerCitaMasReciente()
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    obtenerCitaMasReciente () {
      if (this.citas.length > 0) {
        this.citaMasReciente = this.citas.reduce((a, b) => {
          return new Date(a.fecha) < new Date(b.fecha) ? a : b
        })
      }
    }
  }
}
</script>
<style scoped>
  .citaContainer {
    width: 267px;
    height: 232px;
    border-radius: 24px;
    background-color: #FFDEC8;
  }
  .noticiaContainer {
    width: 676px;
    height: 232px;
    border-radius: 24px;
    background-color: #FFDEC8;
  }
  .medicationContainer{
    width: 270px;
    height: 242px;
  }
  .infoContainer {
    width: 676px;
    height: 252px;
    border-radius: 24px;
    background-color: #FFDEC8;
    font-size: 17px;
  }
  .infoText {
    font-size: 17px;
    margin-bottom: -5px;
    background-color: #FFDEC8;
  }
</style>
