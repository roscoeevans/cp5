<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>Your Account:</h1>
        <p>Username: {{user.username}} </p>
      </div> <br>
      <div class = "logoutAndUpload">
        <p>
          <button @click="toggleUpload" class = "uploadButton">Register a Restaurant</button><br><br>
          <button @click="logout" class = "logoutButton">Logout of Your Account</button>
        </p>
      </div>
    </div>
    <escape-event @escape="escape"></escape-event>
    <uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
    <h1> Your Registered Restaurants: <br> </h1>
    <image-gallery :photos="photos" />
  </div>
  <div v-else>
    <p>If you would like to register a restaurant to be reviewed, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
  <br><br>
  <a href="https://github.com/samuelpugh4/creative5260">GitHub Repo</a>
</div>

</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'
import ImageGallery from '@/components/ImageGallery.vue'


export default {
  name: 'mypage',
  components: {
    EscapeEvent,
    Uploader,
    ImageGallery
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photos() {
      return this.$store.state.photos;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPhotos");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyPhotos");
      } catch (error) {
        console.log(error);
      }
    },

  }
}
</script>

<style scoped>
.header {

}
.logoutAndUpload{
  padding: 10px;
  border: 10px;
}
.uploadButton{
  background-color: grey;
}
.logoutButton{
  background-color: grey;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>
