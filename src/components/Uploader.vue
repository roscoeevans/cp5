<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
        <div class = "blackText">
          <h1 class="modal-title">Register your Restaurant</h1>
        </div>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <div class = "blackText">
              <input v-model="title" placeholder="Name of Restaurant">
              <p></p>
              <textarea v-model="description" placeholder="Description of Restaurant"></textarea>
              <p></p>
              <p></p>
              <button type="button" @click="close" class="pure-button">Close</button>
              <button type="submit" class="pure-button pure-button-secondary">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      description: '',
      error: '',
    }
  },
  methods: {
    fileChanged(event) {
      //this.file = event.target.files[0]
    },
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {
        const formData = new FormData();
        //formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        this.error = await this.$store.dispatch("upload", formData);
        if (!this.error) {
          this.title = '';
          this.description = '';
          //this.file = null;
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
}
.blackText{
  color: black;
}
textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
