<template>
<div>
  <div v-if="photo">
    <img :src="photo.path" />
  </div>
  <p> "{{photo.title}}" </p>
  <p> -{{photo.user.name}} </p>
  <p><i> {{photo.description}} </i> </p>
  <p> ({{formatDate(photo.created)}})</p> <br><br>
  <h1>Comments: </h1>
  <div v-if="user">
    <input type="commentToSubmit" v-model="newComment">
    <button type="button" @click="submitComment(photo.user.name,newComment)" class="pure-button">Comment</button>
  </div>
  <div class = "comments" v-for="comment in comments">
    <p>{{comment.text}}</p>
    <p>{{comment.username}} </p>
    <p>{{formatDate(comment.created)}}</p>
  </div>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: 'photopage',
  data() {
    return {
      photo: null,
      user: null,
      newComment: '',
      comments: [],
      //comments: []
    };
  },
  created() {
    this.loadPhoto();
    //this.loadComments();
    this.user = this.$store.state.user;
  },
  methods: {
    async loadPhoto() {
      try {
        let response = await axios.get("/api/photos/single/" + this.$store.state.singlePhotoID);
        this.photo = response.data;
        this.comments = this.photo.comments;
      } catch (error) {
        console.log(error);
      }
    },
    /*async loadComments() {
      try {
        let response = await axios.get("/api/photos/single/" + this.$store.state.singlePhotoID);
        this.comments = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },*/
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async submitComment(username, commentToSubmit) {
      //var myComment = username + ": " + commentToSubmit;
      //this.photo.comments.push(myComment);
      //loadComments();
      try{
        console.log("About to call api in submit comment");
        let response = await axios.post(
          "/api/photos/comment/" + this.$store.state.singlePhotoID, {
            text: this.newComment,
            username: this.$store.state.user.username,
          });
          this.comments = response.data.comments;
      } catch (error)
      {
        console.log(error);
      }
    }
  }
}


</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.comments{
  border: 1px solid black;
  margin: 10px;
  padding: 10px;

}
.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
  text-align: center;
}

h1 {
  text-align: center;
}

input {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button {
  margin: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
