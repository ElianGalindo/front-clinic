<!-- TablaPaciente.vue -->
<template>
  <div class="tablaCont">
    <!-- Contenido de tu tabla usando los datos de las prescripciones -->
    <table>
      <thead>
        <tr>
          <th>Prescription</th>
          <th>Checkups</th>
          <th>Document's</th>
          <th>Payments</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hola</td>
          <td>como</td>
          <td>estas</td>
          <td>amigo</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .tablaCont{
    margin-left: -15px;
    align-content: center;
    justify-content: center;
  }
  table{
    width: 100%;
  }
  th, td {
    padding-left: 120px; /* Espacio a la izquierda */
    padding-right: 120px;
  }
</style>
