<template>
  <v-app style="background-color:#FFF4EC; width:100%; margin-top: -20px;">
    <v-col>
      <v-row style="height:110px;">
        <v-col cols="8">
          <v-text-field
          width="100px"
          height="50px"
          style="margin-top:30px;"
          label="Search"
          rounded
          outlined
          append-icon="mdi-magnify"
          />
        </v-col>
        <v-col>
          <v-btn
            solid
            width="230px"
            height="50px"
            color="#01520E"
            style="border-radius: 24px; margin-top: 30px;"
          >
            <span style="color: white; text-transform:none;">New Patients</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row style="margin-left:-30px;">
        <v-col cols="9">
          <v-btn class="btnCitas">
            <span class="nomBtn">Yesterday Schedule</span>
          </v-btn>
          <v-btn class="btnCitas">
            <span class="nomBtn">Today Schedule</span>
          </v-btn>
          <v-btn class="btnCitas">
            <span class="nomBtn">Tomorrow Schedule</span>
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          style="background-color: #FFDEC8; border-radius: 24px;"
          align="center"
          justify="center"
        >
          <v-avatar
            color="black"
            size="80"
          />
          <v-row
            justify="center"
            align="center"
            style="font-size: 22px; margin-top: 10px; color: #01520E;"
          >
            For a Appointment
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              outlined
              rounded
              dense
              label="Email"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              outlined
              rounded
              dense
              label="Name"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              outlined
              rounded
              dense
              label="Email"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              outlined
              rounded
              dense
              label="Phone Number"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              outlined
              rounded
              dense
              label="Address"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            style="width: 260px; margin-top: 15px;"
          >
            <v-text-field
              outlined
              rounded
              dense
              label="Date"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-btn
              style="
              color: white;
              background-color:#01520E;
              border-radius:24px;
              width: 260px;
              margin: 15px;">
              <span>Booking</span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-app>
</template>
<script>
export default {
  layout: 'dashboard',
  auth: true
}
</script>
<style scoped>
  .btnCitas{
    background-color: transparent!important;
    color: black;
    width: auto;
    height: 35px;
    border-radius: 24px;
    background-color: none;
    margin-left: 30px;
    border: 1px solid black;
  }
  .nomBtn{
    font-family:Arial, Helvetica, sans-serif;
    text-transform: none;
  }
</style>
