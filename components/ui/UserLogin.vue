<template>
  <v-card color="#EC914380" class="pa-7 cardLogin">
    <v-card-title style="margin-top:50px;">
      <v-row class="rowCard fontTitle" align="center">Welcome</v-row>
      <v-row class="rowCard fontTitle" align="end">Back</v-row>
    </v-card-title>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-text-field
          v-model="email"
          rounded
          label="E-mail"
          outlined
          class="col-6"
        />
      </v-row>
      <v-row align="center" justify="center">
        <v-text-field
          type="password"
          v-model="password"
          rounded
          label="Password"
          outlined
          class="col-6"
        />
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-col cols="12" align="center" justify="center">
        <v-row class="col-5">
          <v-btn block class="pa-2" color="#134700" @click="login">
            <span style="text-transform: none; color:white;">Log-In</span>
          </v-btn>
        </v-row>
        <v-row class="rowCard">
          <span>If you don't have an account </span>
          <a @click="showDialog = true">Sign-Up</a>
        </v-row>
      </v-col>
    </v-card-actions>
    <v-dialog v-model="showDialog" persistent width="500" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          Agregar Usuario
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-text-field
              v-model="nombre"
              label="Nombre"
              placeholder="Escribe tu nombre"
              outlined
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="apaterno"
              label="Apaterno"
              placeholder="Escribe tu Apaterno"
              outlined
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="amaterno"
              label="Amaterno"
              placeholder="Escribe tu Amaterno"
              outlined
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="direccion"
              label="Direccion"
              placeholder="Escribe tu direccion"
              outlined
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="telefono"
              label="Telefono"
              placeholder="Escribe tu Telefono"
              outlined
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="emailNuevo"
              label="Correo"
              placeholder="Escribe tu correo"
              outlined
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="passwordNuevo"
              label="Password"
              type="password"
              placeholder="Escribe tu password"
              outlined
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-col cols="6">
              <v-btn block color="green" @click="registrarUsuario">
                <span style="text-transform: none; color:white;">Registrar</span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="red" @click="showDialog = false">
                <span style="text-transform: none; color:white;">Cancelar</span>
              </v-btn>
            </v-col>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      showDialog: false,
      emailNuevo: null,
      passwordNuevo: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      direccion: null,
      telefono: null
    }
  },
  methods: {
    async login () {
      await console.log('$$$ Datos => ', this.email, this.password)
      const sendData = {
        email: this.email,
        password: this.password
      }
      await this.$auth.loginWith('local', {
        data: sendData
      }).then(async (res) => {
        const result = await res.data
        if (result.message === 'success') {
          this.$store.commit('setToken', result.token)
          this.$router.push('/dashboard')
        }
      }).catch((err) => {
        console.log('$$$ error => ', err)
      })
    },
    registrarUsuario () {
      const url = '/register'
      const data = {
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono,
        email: this.emailNuevo,
        password: this.passwordNuevo
      }
      this.$axios.post(url, data)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'User Registered Successfully') {
            this.showDialog = false
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
  .rowCard{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .fontTitle{
    font-size: 52px!important;
    line-height: 58px!important;
  }

  .cardLogin{
    width: 600px;
    height: 674px;
    border-radius: 30px;
    margin-top: 20px;
  }
</style>
