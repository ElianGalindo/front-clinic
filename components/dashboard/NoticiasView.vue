<template>
  <v-col cols="12">
    <v-row style="margin-top: 15px;" v-for="noticia in news" :key="noticia.id">
      <v-col cols="3" align="center" justify="center">
        <v-img
          style="width: 80px; height: 80px;"
          v-if="noticia.images && noticia.images.thumbnailProxied"
          :src="noticia.images.thumbnailProxied"
        />
      </v-col>
      <v-col>
        <p class="infoNews"><b>{{ noticia.title }}</b></p>
        <p class="infoNews">{{ noticia.snippet }}</p>
        <router-link :to="noticia.newsUrl" target="_blank">
          <p class="infoNews"><b>{{ noticia.newsUrl }}</b></p>
        </router-link>
        <p class="infoNews">{{ noticia.publisher }}</p>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      news: []
    }
  },
  created () {
    this.loadNews()
  },
  methods: {
    async loadNews () {
      const options = {
        method: 'GET',
        url: 'https://google-news13.p.rapidapi.com/health',
        params: { lr: 'en-US' },
        headers: {
          'x-rapidapi-key': '12706adb38mshe069a4b51f27d2cp1a672fjsndbd7bfa1b386',
          'x-rapidapi-host': 'google-news13.p.rapidapi.com'
        }
      }
      try {
        const response = await axios.request(options)
        this.news = response.data.items
        console.log('News => ', response.data.items)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style scoped>
  .infoNews {
    margin-top: -8px;
    font-size: 13px;
  }
</style>
