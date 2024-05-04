<template>
  <v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
        width="100px"
        height="50px"
        style="margin-top:30px;"
        label="hola"
        rounded
        outlined
        />
      </v-col>
      <v-col>
        <v-btn solid>
          <span>New Patients</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
export default {
  layout: 'dashboard',
  auth: true
}
</script>
