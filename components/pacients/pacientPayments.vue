<template>
  <div class="tablaCont">
    <!-- Contenido de tu tabla usando los datos de las prescripciones -->
    <table>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Tratment</th>
          <th>Payments</th>
        </tr>
      </thead>
      <tbody
        v-for="payment in payments"
        :key="payment.id"
      >
        <tr>
          <td>{{ payment.fecha }}{{ payment.hora }}</td>
          <td>{{ payment.tratamiento }}</td>
          <td>{{ payment.pagos }}</td>
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
    payments: {
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
    margin-left: 150px;
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
