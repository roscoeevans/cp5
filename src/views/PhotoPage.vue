<template>
<div>
  <div class = "restaurantName">
   <h1>{{photo.title}}</h1>
  </div>
  <p> -Owner: {{photo.user.username}} </p>
  <p><i>Description:<br> {{photo.description}} </i> </p>
  <br><br>
  <h1>Reviews:</h1>
  <p>Your review will be anonymous if you are not logged in </p><br>
  <div class = "inputComments">
    <input type="commentToSubmit" v-model="newComment">
  </div>
  <button type="button" @click="submitComment(photo.user.name,newComment)" class="pure-button">Post</button>
  <div class = "comments" v-for="comment in comments">
    <p>{{comment.text}}</p>
    <p>-{{comment.username}} </p>
    <p><i>{{formatDate(comment.created)}}</i></p>
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
        let un = "";
        if(this.$store.state.user == null)
        {
          un = "Anonymous";
        }
        else
        {
          un = this.$store.state.user.username;
        }
        let response = await axios.post(
          "/api/photos/comment/" + this.$store.state.singlePhotoID, {
            text: this.newComment,
            username: un,
          });
          this.comments = response.data.comments;
      } catch (error)
      {
        console.log("ERROR:")
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
.inputComments{
color: black;

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

.restaurantName{
  font-size: large !important;
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
