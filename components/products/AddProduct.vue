<template>
  <v-col
    cols="12"
    style="background-color: #FFDEC8; border-radius: 24px; height:400px;"
    class="overflow-y-auto"
    align="center"
    justify="center"
  >
    <v-row
      justify="center"
      align="center"
      style="font-size: 22px; margin-top: 10px; color: #01520E;"
    >
      Add Product
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px;"
    >
      <v-text-field
        v-model="doctorId"
        outlined
        rounded
        dense
        label="Doctor Email"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px;"
    >
      <v-text-field
        v-model="nombre"
        outlined
        rounded
        dense
        label="Nombre"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px;"
    >
      <v-text-field
        v-model="precio"
        outlined
        rounded
        dense
        label="Precio"
        type="number"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px;"
    >
      <v-text-field
        v-model="descripcion"
        outlined
        rounded
        dense
        label="Descripcion"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="width: 260px; margin-top: 15px; margin-bottom: 15px;"
    >
    <input
      type="file"
      ref="archivosInput"
      @change="handleFileUpload"
      accept="image/*"
    />
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        @click="registrarProducto"
        style="
        color: white;
        background-color:#01520E;
        border-radius:24px;
        width: 260px;
        margin: 15px;
        margin-top: -10px;
      ">
        <span>Registrar</span>
      </v-btn>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        @click="$emit('close')"
        style="
        color: white;
        background-color:red;
        border-radius:24px;
        width: 260px;
        margin: 15px;
        margin-top: -10px;
      ">
        <span>Cancelar</span>
      </v-btn>
    </v-row>
  </v-col>
</template>
<script>
export default {
  data () {
    return {
      doctorId: null,
      nombre: null,
      precio: null,
      descripcion: null,
      archivo: null
    }
  },
  methods: {
    handleFileUpload (event) {
      const file = event.target.files[0]
      this.archivo = file
    },
    registrarProducto () {
      const url = '/products/create'
      const data = new FormData()
      data.append('doctorId', this.doctorId)
      data.append('nombre', this.nombre)
      data.append('precio', this.precio)
      data.append('descripcion', this.descripcion)
      data.append('archivo', this.archivo)
      this.$axios
        .post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data'// Especificar que estamos enviando datos multipart/form-data
          }
        })
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'Product Registered Successfully') {
            this.$emit('close')
            this.$emit('agregar-producto')
          }
        })
        .catch((error) => {
          console.log('$$ error => ', error)
        })
    }
  }
}
</script>
