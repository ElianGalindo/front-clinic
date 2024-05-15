<template>
  <v-card style="background-color:#FFDEC8;">
    <v-card-title>
      Add New Patient
    </v-card-title>
    <v-card-text>
      <v-col>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-text-field
            v-model="email"
            outlined
            label="Email"
            rounded
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-text-field
            v-model="nombre"
            outlined
            label="Nombre"
            rounded
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-text-field
            v-model="apaterno"
            outlined
            label="A.paterno"
            rounded
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-text-field
            v-model="amaterno"
            outlined
            label="A.materno"
            rounded
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-col>
            <v-text-field
              v-model="edad"
              outlined
              label="Age"
              rounded
            />
          </v-col>
          <v-col>
            <p>Sex: </p>
            <v-radio-group v-model="sexo" row>
              <v-radio label="Male" value="Hombre"></v-radio>
              <v-radio label="Female" value="Mujer"></v-radio>
              <v-radio label="Other" value="Otro"></v-radio>
            </v-radio-group>
            <span>Selected value: {{ sexo }}</span>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-text-field
            v-model="telefono"
            outlined
            label="Phone"
            rounded
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <v-text-field
            v-model="direccion"
            outlined
            label="Address"
            rounded
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="inputAdd"
        >
          <input
            type="file"
            ref="archivosInput"
            @change="handleFileUpload"
            accept="image/*"
          />
        </v-row>
      </v-col>
    </v-card-text>
    <v-card-actions>
      <v-btn color="green" class="btnAdd" @click="registrarPaciente">
        <span class="title">Add</span>
      </v-btn>
      <v-btn color="red" class="btnAdd" @click="$emit('close')">
        <span class="title">Cancel</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      email: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      edad: null,
      sexo: '',
      telefono: null,
      direccion: null,
      archivo: null
    }
  },
  methods: {
    handleFileUpload (event) {
      const file = event.target.files[0]
      this.archivo = file
    },
    registrarPaciente () {
      const url = '/pacients/create'
      const data = new FormData()
      data.append('email', this.email)
      data.append('nombre', this.nombre)
      data.append('apaterno', this.apaterno)
      data.append('amaterno', this.amaterno)
      data.append('edad', this.edad)
      data.append('sexo', this.sexo)
      data.append('telefono', this.telefono)
      data.append('direccion', this.direccion)
      data.append('archivo', this.archivo)
      this.$axios
        .post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data'// Especificar que estamos enviando datos multipart/form-data
          }
        })
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'Pacient Registered Successfully') {
            this.$emit('close')
            this.$emit('pacient-added')
          }
        })
        .catch((error) => {
          console.log('$$ error => ', error)
        })
    }
  }
}
</script>
<style scoped>
  .title {
    text-transform: none;
    color: white;
  }
  .btnAdd {
    border-radius: 24px;
    width: 150px;
    height: 50px;
  }
  .inputAdd {
    width: 260px;
    margin-top: 15px;
  }
</style>
