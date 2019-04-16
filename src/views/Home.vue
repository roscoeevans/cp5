<template>
<div class="home">
  <image-gallery :photos="photos" />
  <br><br>
  <a href="https://github.com/BYU-CS-260-Winter-2019/lab-5-samuelpugh4">GitHub Repo</a>
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
