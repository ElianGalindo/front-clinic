<!-- TablaPaciente.vue -->
<template>
  <v-col cols="12">
    <v-row
      v-for="prescripcion in prescripciones"
      :key="prescripcion.id"
      align="center"
      justify="center"
      class="notasContenedor"
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
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    paciente: {
      type: Object,
      required: true
    },
    prescripciones: {
      type: Array,
      default: () => []
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
  }
</style>
