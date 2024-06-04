<!-- TablaPaciente.vue -->
<template>
  <v-col cols="12" style="padding-bottom: 10px;">
    <v-row
      v-for="prescripcion in prescripciones"
      :key="prescripcion.id"
      align="center"
      justify="center"
      class="notasContenedor"
      style="margin-bottom: 20px; margin-top: 20px;"
    >
      <v-col cols="9">
        <v-row style="margin-left:20px;">
          <p><b>{{ prescripcion.doctor }}</b></p>
        </v-row>
        <v-row style="margin-left:20px;">
          <p><b>{{ prescripcion.nota }}</b></p>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <p class="letra2">{{ prescripcion.fecha }}</p>&nbsp;&nbsp;
          <p class="letra2">{{ prescripcion.hora }}</p>
        </v-row>
        <v-row>
          <v-btn
              style="width: 40px; height: 25px; border-radius: 20px; background-color: rgb(237, 96, 96); margin-left: 100px;"
              @click="deletePrescription(prescripcion)"
            >
              <v-icon color="white">mdi-trash-can</v-icon>
            </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="showDelete" width="300">
      <v-card style="background-color:#FFDEC8;">
        <v-card-title>
          Delete Prescription
        </v-card-title>
        <v-card-text> Are you sure?</v-card-text>
        <v-card-actions>
          <v-col>
              <v-col cols="6">
                <v-btn block color="green" @click="borrarPrescripcion">
                  <span style="text-transform: none; color:white;">Delete</span>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="red" @click="showDelete">
                  <span style="text-transform: none; color:white;">Cancel</span>
                </v-btn>
              </v-col>
            </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      prescriptionToDelete: null,
      showDelete: false
    }
  },
  props: {
    paciente: {
      type: Object,
      required: true
    },
    prescripciones: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    deletePrescription (prescripcion) {
      this.prescriptionToDelete = prescripcion
      this.showDelete = true
    },
    borrarPrescripcion () {
      const url = `/prescripcion/${this.prescriptionToDelete.id}`
      this.$axios.delete(url)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.status === 204) {
            this.showDelete = false
            this.$emit('prescripcion-eliminado')
          }
        })
        .catch((err) => {
          console.log('$$ err => ', err)
        })
    }
  }
}
</script>
<style scoped>
  .letra2{
    font-size: 16px;
    margin-top: -15px;
    margin-left: 20px;
  }
  .notasContenedor{
    border-radius: 24px;
    background-color: #D9D9D9;
    width: 1100px;
    height: 140px;
    margin-left: 60px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
