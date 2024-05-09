<template>
  <v-app style="background-color:#FFF4EC; width:auto; margin-top: -20px;">
    <v-col>
      <!-- aqui se encuentra el buscador y boton agregar -->
      <v-row style="height:110px;">
        <v-col cols="8">
          <v-text-field
          width="100px"
          height="50px"
          style="margin-top:30px;"
          label="Search"
          rounded
          outlined
          append-icon="mdi-magnify"
          />
        </v-col>
        <v-col>
          <v-btn
            solid
            width="230px"
            height="50px"
            color="#01520E"
            style="border-radius: 24px; margin-top: 30px;"
            @click="showAddPacient = true"
          >
            <span style="color: white; text-transform:none;">New Patients</span>
          </v-btn>
          <v-dialog v-model="showAddPacient" persistent transition="dialog-bottom-transition" width="500">
            <add-pacient @close="showAddPacient = false" />
          </v-dialog>
        </v-col>
      </v-row>
      <!-- aqui se encuentra el mostrar citas y agregar citas -->
      <v-row style="margin-left:-30px;">
        <!-- en esta columna estan las citas que existen -->
        <v-col cols="9">
          <!-- en este renglon se muestra la informacion de cada cita -->
          <v-row>
            <citas-show ref="citasShow"/>
          </v-row>
          <!-- Aqui van los doctores -->
          <v-row style="height: 100px;">
            <doctores-show />
          </v-row>
        </v-col>
        <!-- Aqui va el formulario para agregar una cita -->
        <v-col
          cols="3"
          style="background-color: #FFDEC8; border-radius: 24px; height:600px;"
          class="overflow-y-auto"
          align="center"
          justify="center"
        >
          <v-avatar
            color="black"
            size="80"
          />
          <v-row
            justify="center"
            align="center"
            style="font-size: 22px; margin-top: 10px; color: #01520E;"
          >
            For a Appointment
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              v-model="pacienteId"
              outlined
              rounded
              dense
              label="Email"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              v-model="fecha"
              outlined
              rounded
              dense
              label="Fecha"
              type="date"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              v-model="hora"
              outlined
              rounded
              dense
              label="Hora"
              type="time"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              v-model="motivo"
              outlined
              rounded
              dense
              label="Motivo"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              v-model="doctor"
              outlined
              rounded
              dense
              label="Doctor"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              v-model="consultorio"
              outlined
              rounded
              dense
              label="Consultorio"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-btn
              @click="registrarCita"
              style="
              color: white;
              background-color:#01520E;
              border-radius:24px;
              width: 260px;
              margin: 15px;
              margin-top: -10px;
            ">
              <span>Booking</span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-app>
</template>
<script>
import CitasShow from '~/components/citas/CitasShow.vue'
import AddPacient from '~/components/pacients/AddPacient.vue'
export default {
  components: { AddPacient, CitasShow },
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      showAddPacient: false,
      pacienteId: null,
      fecha: null,
      hora: null,
      motivo: null,
      doctor: null,
      consultorio: null
    }
  },
  methods: {
    registrarCita () {
      const url = '/citas/create'
      const data = {
        pacienteId: this.pacienteId,
        fecha: this.fecha,
        hora: this.hora,
        motivo: this.motivo,
        doctor: this.doctor,
        consultorio: this.consultorio
      }
      this.$axios.post(url, data)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'Cita Registered Successfully') {
            // this.$emit('citaAgregada')
            this.pacienteId = ''
            this.fecha = ''
            this.hora = ''
            this.motivo = ''
            this.doctor = ''
            this.consultorio = ''
            const citasShowComponent = this.$refs.citasShow
            citasShowComponent.loadCitas()
          }
        })
        .catch((error) => {
          console.log('$$ error => ', error)
          alert('El paciente no existe!!')
        })
    }
  }
}
</script>
<style scoped>
</style>
