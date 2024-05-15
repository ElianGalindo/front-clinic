<template>
  <v-row>
    <v-app style="background-color:#FFF4EC; width:100%; margin-top: -20px;">
      <v-col cols="12">
        <!-- aqui se encuentra el buscador y reloj -->
      <v-row style="height:110px;">
        <v-col cols="8">
          <v-text-field
          width="100px"
          height="50px"
          style="margin-top:30px; margin-left: 50px;"
          label="Search"
          rounded
          outlined
          append-icon="mdi-magnify"
          />
        </v-col>
        <v-col>
          <v-img
            :src="require('assets/images/reloj.svg')"
            style="height: 30px; width: 30px; margin-top: 40px; margin-left: 50px;"
          />
        </v-col>
        <!-- Botones para agregar datos -->
        <v-col>
          <v-row style="margin-top:20px;">
            <v-row>
              <v-btn @click="showPrescription = true" style="background-color: rgb(22, 137, 22);">
                <span style="text-transform: none; color: white;">Add Prescription</span>
              </v-btn>
              <v-dialog v-model="showPrescription" persistent transition="dialog-bottom-transition" width="400">
                <add-prescription @close="showPrescription = false"/>
              </v-dialog>
            </v-row>
            <v-row style="margin-top:10px;">
              <v-btn style="width: 160px; background-color: rgb(22, 137, 22); margin-top: 10px;" @click="showCheckup = true">
                <span style="text-transform: none; color: white;">Add Checkup</span>
              </v-btn>
              <v-dialog v-model="showCheckup" persistent transition="dialog-bottom-transition" width="400">
                <add-checkup @close="showCheckup = false"/>
              </v-dialog>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row v-for="paciente in pacientes" :key="paciente.email">
            <!-- Aqui va la imagen del paciente -->
            <v-col cols="12">
              <v-row>
                <v-col>
                  <div class="imgPaciente">
                    <v-img
                      v-if="paciente.archivos && paciente.archivos.length > 0"
                      :src="paciente.archivos[0]"
                      style="max-width: 100%; height:158px;"
                    />
                    <v-img
                      v-else
                      :src="require('@/assets/images/paciente.png')"
                      style="width: 260px; height:158px;"
                    />
                  </div>
                </v-col>
                <!-- Aqui va la informacion del paciente -->
                <v-col>
                  <h4><b>{{ paciente.nombre }} {{ paciente.apaterno }} {{ paciente.amaterno }}</b></h4>
                  <v-row class="ma-0">
                    <p class="pacDatos1"><b>Age: {{ paciente.edad }}</b></p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <p class="pacDatos1"><b>Sex: {{ paciente.sexo }}</b></p>
                  </v-row>
                  <p class="pacDatos"><b>Phone Number: {{ paciente.telefono }}</b></p>
                  <p class="pacDatos"><b>E-mail: {{ paciente.email }}</b></p>
                  <p class="pacDatos"><b>Address: {{ paciente.direccion }}</b></p>
                  <!-- Boton info paciente -->
                  <v-btn
                    style="width: 40px; height: 25px; border-radius: 20px;"
                    @click="mostrarTablas(paciente)"
                  >
                    <v-icon>mdi-information-outline</v-icon>
                  </v-btn>
                  <!-- boton borrar paciente -->
                  <v-btn
                    style="width: 40px; height: 25px; border-radius: 20px; background-color: rgb(237, 96, 96);"
                    @click="deletePaciente(paciente)"
                  >
                    <v-icon color="white">mdi-trash-can</v-icon>
                  </v-btn>
                  <!-- Boton actualizar paciente -->
                  <v-btn
                    style="width: 40px; height: 25px; border-radius: 20px; background-color: rgb(237, 164, 96);"
                    @click="updatePaciente(paciente)"
                  >
                    <v-icon color="white">mdi-pencil-circle-outline</v-icon>
                  </v-btn>
                </v-col>
                <!-- Aqui va la imagen de sus datos -->
                <v-col>
                  <div>
                    <v-img
                    :src="require('@/assets/images/datos.svg')"
                    style="width:330px; height: 150px;"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-row v-if="paciente.tablaVisible">
              <v-col cols="12">
                <v-row>
                  <v-col>
                    <v-btn class="btnTable" @click="mostrarPrescripcion(paciente)">
                      <span class="nameTable">Prescription</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn class="btnTable" @click="mostrarCheckup(paciente)">
                      <span class="nameTable">Checkups</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn class="btnTable" @click="mostrarDocuments(paciente)">
                      <span class="nameTable">Document's</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn class="btnTable" @click="mostrarPayments(paciente)">
                      <span class="nameTable">Payments</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <pacient-prescription v-if="paciente.prescripcionVisible" :paciente="paciente" :prescripciones="paciente.prescripciones"/>
                  <pacient-checkup v-if="paciente.checkupVisible" :paciente="paciente" :checkups="paciente.checkups" />
                  <pacient-documents v-if="paciente.documentVisible" :paciente="paciente" :documents="paciente.documents"/>
                  <pacient-payments v-if="paciente.paymentVisible" :paciente="paciente" :payments="paciente.payments"/>
                </v-row>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
        <v-dialog v-model="showDelete" width="300">
          <v-card style="background-color:#FFDEC8;">
            <v-card-title>
              Delete Pacient
            </v-card-title>
            <v-card-text> Are you sure?</v-card-text>
            <v-card-actions>
              <v-col>
                  <v-col cols="6">
                    <v-btn block color="green" @click="borrarPaciente">
                      <span style="text-transform: none; color:white;">Delete</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn block color="red" @click="showDeleteDialog">
                      <span style="text-transform: none; color:white;">Cancel</span>
                    </v-btn>
                  </v-col>
                </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="showUpdate" width="350">
          <v-card style="background-color:#FFDEC8;">
            <v-card-title>
              Update Patient
            </v-card-title>
            <v-card-text>
              <v-col>
                <v-row
                  align="center"
                  justify="center"
                  class="inputAdd"
                >
                  <v-text-field
                    v-model="pacientToUpdate.email"
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
                    v-model="pacientToUpdate.nombre"
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
                    v-model="pacientToUpdate.apaterno"
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
                    v-model="pacientToUpdate.amaterno"
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
                      v-model="pacientToUpdate.edad"
                      outlined
                      label="Age"
                      rounded
                    />
                  </v-col>
                  <v-col>
                    <p>Sex: </p>
                    <v-radio-group v-model="pacientToUpdate.sexo" row>
                      <v-radio label="Male" value="Hombre"></v-radio>
                      <v-radio label="Female" value="Mujer"></v-radio>
                      <v-radio label="Other" value="Otro"></v-radio>
                    </v-radio-group>
                    <span>Selected value: {{ pacientToUpdate.sexo }}</span>
                  </v-col>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="inputAdd"
                >
                  <v-text-field
                    v-model="pacientToUpdate.telefono"
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
                    v-model="pacientToUpdate.direccion"
                    outlined
                    label="Address"
                    rounded
                  />
                </v-row>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" class="btnAdd" @click="actualizarPaciente">
                <span class="title">Add</span>
              </v-btn>
              <v-btn color="red" class="btnAdd" @click="showUpdate = false">
                <span class="title">Cancel</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      </v-col>
    </v-app>
  </v-row>
</template>
<script>
import AddCheckup from '~/components/pacients/AddCheckup.vue'
import PacientDocuments from '~/components/pacients/pacientDocuments.vue'

export default {
  components: { AddCheckup, PacientDocuments },
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      pacientes: [],
      tablaVisible: false,
      prescripcionVisible: false,
      checkupVisible: false,
      documentVisible: false,
      paymentVisible: false,
      prescripciones: [],
      checkups: [],
      documents: [],
      payments: [],
      showPrescription: false,
      showCheckup: false,
      pacientToDelete: null,
      showDelete: false,
      showUpdate: false,
      pacientToUpdate: {}
    }
  },
  mounted () {
    this.loadPacientes()
  },
  methods: {
    loadPacientes () {
      const url = '/pacients/get-all-pacients'
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response => ', res)
          if (res.data.message === 'success') {
            this.pacientes = res.data.pacients.map(paciente => ({
              ...paciente,
              tablaVisible: false,
              prescripcionVisible: false,
              checkupVisible: false,
              documentVisible: false,
              paymentVisible: false
            }))
          }
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    mostrarTablas (paciente) {
      paciente.tablaVisible = !paciente.tablaVisible
    },
    mostrarPrescripcion (paciente) {
      const url = `/prescripcion/get-prescriptions-by-patient/${paciente.email}`
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response2 => ', res)
          paciente.prescripcionVisible = !paciente.prescripcionVisible
          paciente.checkupVisible = false
          paciente.documentVisible = false
          paciente.paymentVisible = false
          this.$set(paciente, 'prescripciones', res.data.prescriptions)
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    mostrarCheckup (paciente) {
      const url = `/checkup/get-checkups-by-patient/${paciente.email}`
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response3 => ', res)
          paciente.checkupVisible = !paciente.checkupVisible
          paciente.prescripcionVisible = false
          paciente.documentVisible = false
          paciente.paymentVisible = false
          this.$set(paciente, 'checkups', res.data.checkups)
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    mostrarDocuments (paciente) {
      const url = `/checkup/get-checkups-by-patient/${paciente.email}`
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response 4 => ', res)
          paciente.documentVisible = !paciente.documentVisible
          paciente.prescripcionVisible = false
          paciente.checkupVisible = false
          paciente.paymentVisible = false
          this.$set(paciente, 'documents', res.data.checkups)
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    mostrarPayments (paciente) {
      const url = `/checkup/get-checkups-by-patient/${paciente.email}`
      this.$axios.get(url)
        .then((res) => {
          console.log('$$response 5 => ', res)
          paciente.paymentVisible = !paciente.paymentVisible
          paciente.prescripcionVisible = false
          paciente.checkupVisible = false
          paciente.documentVisible = false
          this.$set(paciente, 'payments', res.data.checkups)
        })
        .catch((error) => {
          console.log('$$error => ', error)
        })
    },
    deletePaciente (paciente) {
      this.pacientToDelete = paciente
      this.showDelete = true
    },
    showDeleteDialog () {
      this.showDelete = false
    },
    borrarPaciente () {
      const url = `/pacients/${this.pacientToDelete.email}`
      this.$axios.delete(url)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.status === 204) {
            this.showDelete = false
            this.loadPacientes()
          }
        })
        .catch((err) => {
          console.log('$$ err => ', err)
        })
    },
    updatePaciente (paciente) {
      this.pacientToUpdate = paciente
      this.showUpdate = true
    },
    actualizarPaciente () {
      const url = `/pacients/${this.pacientToUpdate.email}`
      this.$axios.put(url, this.pacientToUpdate)
        .then((res) => {
          console.log('$$ res => ', res)
          if (res.data.message === 'success') {
            this.showUpdate = false
            this.loadPacientes()
          }
        })
        .catch((err) => {
          this.showUpdate = false
          this.loadPacientes()
          console.log('$$ err => ', err)
        })
    }
  }
}
</script>
<style scoped>
  .imgPaciente {
    border-radius: 24px;
    width: 260px;
    height: 158px;
    margin-left: 70px;
  }
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
  .btnTable {
    width: 150px;
    height: 45px;
    border-radius: 24px;
    background-color: #FFF4EC!important;
    margin-left: 70px;
  }
  .btnTable:hover{
    background-color: #F1AD3F!important;
    cursor: pointer;
  }
  .nameTable{
    text-transform: none;
  }
  .btnAdd {
    border-radius: 24px;
    width: 150px;
    height: 50px;
  }
  .title {
    text-transform: none;
    color: white;
  }
</style>
