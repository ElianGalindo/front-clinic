<template>

</template>

<script>
export default {
  data () {
    return {
      pacientes: [] // Aquí se almacenarán los pacientes obtenidos del servidor
    }
  },
  mounted () {
    // Aquí podrías llamar a un método para cargar la lista de pacientes desde el servidor
    this.loadPacients()
  },
  methods: {
    loadPacients () {
      const url = '/pacients/get-all-pacients'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.pacientes = res.data.pacients
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    }
  },
  created () {
    this.$root.$on('pacient-added', () => {
      this.loadPacients()
    })
  }
}
</script>
<style scoped>
  .pacDatos{
    margin: 0;
    padding: 0;
    width: 300px;
    margin-top: -5px;
    font-size: 12px;
  }
  .pacDatos1{
    font-size: 16px;
  }
</style>
