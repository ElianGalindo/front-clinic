<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      permanent
      color="#FFDEC8"
      width="208px"
      height="834px"
      style="border-radius:24px; left:1px;"
    >

      <v-row style="margin-top:10px;">
        <v-img :src="require('@/assets/images/logo2.svg')" />
      </v-row>

      <v-list>
        <v-list-item
          v-for="[icon, text, ruta] in links"
          :key="icon"
          link
          :to="ruta"
          @click="selectItem(icon)"
          :class="{ 'selected': selectedIndex === icon }"
          class="my-4"
          width="209px"
          height="59px"
          style="border-radius:24px 0 0 24px;"
          solid
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      drawer: null,
      selectedIndex: null,
      links: [
        ['mdi-calendar-month', 'Schedule', '/dashboard/Schedule'],
        ['mdi-bed-outline', 'Patients', '/dashboard/Patients'],
        ['mdi-cart-outline', 'Patients', '/dashboard/Orders'],
        ['mdi-microscope', 'Patients', '/dashboard/Laboratory']
      ]
    }
  },
  methods: {
    selectItem (icon) {
      this.selectedIndex = icon
    }
  }
}
</script>
<style scoped>
  .selected {
    background-color: #874C96; /* Cambia el color de fondo cuando se selecciona */
    color:white;
 }
</style>
