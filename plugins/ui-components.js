import Vue from 'vue'
import UserLogin from '@/components/ui/UserLogin.vue'
import PacientShow from '@/components/pacients/PacientShow.vue'
import AddPacient from '@/components/pacients/AddPacient.vue'
import CitasShow from '@/components/citas/CitasShow.vue'
import DoctoresShow from '@/components/doctores/DoctoresShow.vue'
import PacientPrescription from '@/components/pacients/PacientPrescription.vue'
import PacientCheckup from '@/components/pacients/PacientCheckup.vue'
import PacientDocuments from '@/components/pacients/PacientDocuments.vue'
import PacientPayments from '@/components/pacients/PacientPayments.vue'

Vue.component('UserLogin', UserLogin)
Vue.component('PacientShow', PacientShow)
Vue.component('AddPacient', AddPacient)
Vue.component('CitasShow', CitasShow)
Vue.component('DoctoresShow', DoctoresShow)
Vue.component('PacientPrescription', PacientPrescription)
Vue.component('PacientCheckup', PacientCheckup)
Vue.component('PacientDocuments', PacientDocuments)
Vue.component('PacientPayments', PacientPayments)
