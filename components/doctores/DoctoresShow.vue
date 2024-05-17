<template>
  <v-col cols="12">
    <p><b>Doctors</b></p>
    <v-row>
      <v-col
        cols="3"
        class="overflow-x-auto"
        v-for="doctor in doctores"
        :key="doctor.email"
      >
        <v-row>
          <v-col cols="3" align="enter" justify="center">
            <v-img
              v-if="doctor.archivos && doctor.archivos.length > 0"
              :src="doctor.archivos[0]"
              style="width: 40px; height:40px; border-radius: 50%;"
            />
          </v-col>
          <v-col>
            <p style="font-size: 13px;"><b>Dr. {{ doctor.nombre }}</b></p>
            <p class="drDatos">{{ doctor.email }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  data () {
    return {
      doctores: []
    }
  },
  mounted () {
    this.loadDoctores()
  },
  methods: {
    loadDoctores () {
      const url = '/get-all-users'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.doctores = res.data.users
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    }
  }
}
</script>
<style scoped>
  .drDatos{
    margin-top: -15px;
    font-size: 12px;
  }
</style>
