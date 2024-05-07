<template>
    <div class="card">
      <div class="card-body">
          <h1>New Forum Post</h1>
          <div class="form-group">
            <input type="text" class="form-control" id="userInputForm" placeholder="Title" v-model="postTitle"/>
          </div>
          <br>
          <div class="form-group">
            <div class="prompt-container">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="postContent"></textarea>
          </div>
          <br>
          <div class="button-flex">
            <button @click="discardPost" class="btn btn-primary">Discard</button>
            <button class="btn btn-primary">Post</button>
          </div>
          </div>
        </div>
      </div>
</template>

<script>

export default {
    data() {
      return {
        currentUser: null,
        userDataDoc: null,
        postTitle: '',
        postDate: '',
        postContent: ''
      }
    },
    methods: {
      discardPost(){
        this.$emit('discard-post');
      }
    },
    computed: {
      postDate() {
    }
  }
}
</script>
<style>

</style>