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
      Add Checkup
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
        label="Paciente Email"
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
        v-model="tratamiento"
        outlined
        rounded
        dense
        label="Tratamiento"
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
        v-model="comentarios"
        outlined
        rounded
        dense
        label="Comentarios"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px;"
    >
      <input
          type="file"
          ref="archivosInput"
          @change="handleFileUpload"
          accept=".pdf"
        />
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px;"
    >
      <v-text-field
        v-model="pagos"
        outlined
        rounded
        dense
        label="Pagos"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        @click="registrarCheckup"
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
      tratamiento: null,
      doctor: null,
      comentarios: null,
      archivos: null,
      pagos: null
    }
  },
  methods: {
    handleFileUpload (event) {
      const file = event.target.files[0]
      this.archivos = file
    },
    registrarCheckup () {
      const url = '/checkup/create'
      const data = new FormData()
      data.append('pacienteId', this.pacienteId)
      data.append('fecha', this.fecha)
      data.append('hora', this.hora)
      data.append('tratamiento', this.tratamiento)
      data.append('doctor', this.doctor)
      data.append('comentarios', this.comentarios)
      data.append('archivos', this.archivos) // Adjuntar el archivo al FormData
      data.append('pagos', this.pagos)
      this.$axios
        .post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data'// Especificar que estamos enviando datos multipart/form-data
          }
        })
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'Checkup Registered Successfully') {
            this.$emit('close')
          }
        })
        .catch((error) => {
          console.log('$$ error => ', error)
          alert('El paciente no existe!')
        })
    }
  }
}
</script>
