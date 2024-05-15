<template>
  <div class="tablaCont">
    <!-- Contenido de tu tabla usando los datos de las prescripciones -->
    <table>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Tratment</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody
        v-for="document in documents"
        :key="document.id"
      >
        <tr>
          <td>{{ document.fecha }}{{ document.hora }}</td>
          <td>{{ document.tratamiento }}</td>
          <td>
            <v-icon @click="downloadFile(document.archivos)" style="color: black;">
              mdi-tray-arrow-down
            </v-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    paciente: {
      type: Object,
      required: true
    },
    documents: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    downloadFile (archivoURL) {
      const newWindow = window.open(archivoURL, '_blank')
      newWindow.focus()
    }
  }
}
</script>
<style scoped>
  .tablaCont{
    align-content: center;
    justify-content: center;
    margin-left: 130px;
  }
  td, th{
    padding-left: 100px; /* Espacio a la izquierda */
    padding-right: 100px;
    padding-top: 10px; /* Espacio a la izquierda */
    padding-bottom: 10px;
    text-align: center;
    justify-content: center;
  }
</style>
