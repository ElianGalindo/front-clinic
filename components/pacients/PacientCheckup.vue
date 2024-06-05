<!-- TablaPaciente.vue -->
<template>
  <div class="tablaCont">
    <!-- Contenido de tu tabla usando los datos de las prescripciones -->
    <table style="margin-left: 50px;">
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Tratment</th>
          <th>Doctor</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody
        v-for="checkup in checkups"
        :key="checkup.id"
      >
        <tr>
          <td>{{ checkup.fecha }}{{ checkup.hora }}</td>
          <td>{{ checkup.tratamiento }}</td>
          <td>{{ checkup.doctor }}</td>
          <td>{{ checkup.comentarios }}</td>
          <td>
            <v-btn
              style="width: 40px; height: 25px; border-radius: 20px; background-color: rgb(237, 96, 96);"
              @click="deleteCheckup(checkup)"
            >
              <v-icon color="white">mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <v-dialog v-model="showDelete" width="300">
      <v-card style="background-color:#FFDEC8;">
        <v-card-title>
          Delete Checkup
        </v-card-title>
        <v-card-text> Are you sure?</v-card-text>
        <v-card-actions>
          <v-col>
              <v-col cols="6">
                <v-btn block color="green" @click="borrarCheckup">
                  <span style="text-transform: none; color:white;">Delete</span>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="red" @click="showDelete = false">
                  <span style="text-transform: none; color:white;">Cancel</span>
                </v-btn>
              </v-col>
            </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkupToDelete: null,
      showDelete: false
    }
  },
  props: {
    paciente: {
      type: Object,
      required: true
    },
    checkups: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    deleteCheckup (checkup) {
      this.checkupToDelete = checkup
      this.showDelete = true
    },
    borrarCheckup () {
      const url = `/checkup/${this.checkupToDelete.id}`
      this.$axios.delete(url)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.status === 204) {
            this.showDelete = false
            this.$emit('checkup-eliminado')
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
  .tablaCont{
    align-content: center;
    justify-content: center;
  }
  td, th{
    padding-left: 60px; /* Espacio a la izquierda */
    padding-right: 60px;
    padding-top: 10px; /* Espacio a la izquierda */
    padding-bottom: 10px;
    text-align: center;
    justify-content: center;
  }
</style>
