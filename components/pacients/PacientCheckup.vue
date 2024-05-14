<!-- TablaPaciente.vue -->
<template>
  <div class="tablaCont">
    <!-- Contenido de tu tabla usando los datos de las prescripciones -->
    <table>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Tratment</th>
          <th>Doctor</th>
          <th>Comments</th>
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
    checkups: {
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
