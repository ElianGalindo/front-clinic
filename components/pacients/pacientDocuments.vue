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
          <td>{{ document.archivos }}</td>
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
