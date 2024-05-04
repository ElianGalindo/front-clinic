<template>
  <v-app>
    <v-main>
      <v-sheet class="pa-0 ma-0" width="100vw" height="100vh" style="background-color: #FFDEC8;">
        <v-row>
          <v-col cols="6">
            <v-row align="center" justify="center" style="margin-top:20px;">
              <h1 style="">Clinic patient's Dashboard</h1>
            </v-row>
            <v-row align="center" justify="center" class="pa-3">
              <v-img height="20%" :src="require('@/assets/images/logo.svg')" style="height: 550px; width: 550px;"/>
            </v-row>
          </v-col>
          <v-col cols="6" style="height:100%!important;" align-self="center">
            <Nuxt />
          </v-col>
        </v-row>
      </v-sheet>
    </v-main>
  </v-app>
</template>
