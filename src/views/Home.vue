<template>
<div class="home">
  <h1>Click on a restaurant to leave a review!</h1>
  <image-gallery :photos="photos" />
  <br><br>
  <a href="https://github.com/samuelpugh4/creative5260">GitHub Repo</a>
</div>


</template>

<script>
// @ is an alias to /src
import ImageGallery from '@/components/ImageGallery.vue'

export default {
  name: 'home',
  components: {
    ImageGallery
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPhotos");
  },
}
</script>
