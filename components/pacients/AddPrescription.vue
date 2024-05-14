<template>
  <v-col
    cols="12"
    style="background-color: #FFDEC8; border-radius: 24px; height:600px;"
    class="overflow-y-auto"
    align="center"
    justify="center"
  >
    <v-row
      justify="center"
      align="center"
      style="font-size: 22px; margin-top: 10px; color: #01520E;"
    >
      Add Prescription
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
        v-model="nota"
        outlined
        rounded
        dense
        label="Nota"
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
    >
      <v-btn
        @click="registrarPrescripcion"
        style="
        color: white;
        background-color:#01520E;
        border-radius:24px;
        width: 260px;
        margin: 15px;
        margin-top: -10px;
      ">
        <span>Registrar</span>
      </v-btn>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        @click="$emit('close')"
        style="
        color: white;
        background-color:red;
        border-radius:24px;
        width: 260px;
        margin: 15px;
        margin-top: -10px;
      ">
        <span>Cancelar</span>
      </v-btn>
    </v-row>
  </v-col>
</template>
<script>
export default {
  data () {
    return {
      pacienteId: null,
      fecha: null,
      hora: null,
      nota: null,
      doctor: null
    }
  },
  methods: {
    registrarPrescripcion () {
      const url = '/prescripcion/create'
      const data = {
        pacienteId: this.pacienteId,
        fecha: this.fecha,
        hora: this.hora,
        nota: this.nota,
        doctor: this.doctor
      }
      this.$axios.post(url, data)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'Prescription Registered Successfully') {
            this.$emit('close')
          }
        })
        .catch((error) => {
          console.log('$$ error => ', error)
        })
    }
  }
}
</script>
