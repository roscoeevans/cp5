<template>
<div>
  <div class="image" v-for="photo in photos" v-bind:key="photo._id" @click="showPhoto(photo._id)">
    <h1 class="photoTitle" @click="showPhoto(photo._id)">{{photo.title}}</h1>
    <p @click="showPhoto(photo._id)">{{photo.description}}</p>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ImageGallery',
  props: {
    photos: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async showPhoto(id)
    {
      console.log("Showing Photo!")
      await this.$store.dispatch("setNewSinglePhotoID", id);
      this.$router.push("/photopage");
    }
  },
}
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

h1{
  font-size: medium;
}
.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  padding: 10px;
  border: 1px solid white;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
