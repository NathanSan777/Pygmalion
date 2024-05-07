<template>
    <div class="card">
        <div class="card-body">
            <div class="card" :style="{backgroundColor: entry.userColor}">
                <h2>{{ entry.title }}</h2>
                <p>By: {{ entry.originalPoster}}</p>
                <p>{{ entry.content }}</p>
            </div>
            <br>
         
            <div class="card shadow-0 border" :style="{backgroundColor: entry.userColor}">
                <div class="card-body p-4">
                    <h1>Comments</h1>
                    <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="addANote" class="form-control" placeholder="Type comment..." />
                    <br>
                    <div v-for="(comment, index) in entry.comments" :key="index" class="card mb-4" :style="{backgroundColor: comment.userColor}" style="border: solid black;">
                        <div class="card-body">
                            <p>{{ comment.content }}</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <p class="small mb-0 ms-2">{{ comment.commenterName }}</p>
                                </div>
                            </div>
                            <br></br>
                            <p class="small mb-0 ms-2">{{comment.createdAt}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <button @click="closeDetail" class="btn btn-primary">Exit Post</button>
    </div>
</div>
</template>

<script>
export default {
    props: {
      entry: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeDetail() {
        this.$emit('close');
      }
    }
  }

</script>
<style scoped>
  .card {
    width: fit-content; 
    height: fit-content;
    margin: auto; 
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; padding: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.entry-card {
    width: 75%; /* Ensures each card takes up full width */
    margin-bottom: 5px; /* Adjust as needed for spacing between cards */
    padding: 0%;
    cursor: pointer;
}
.entry-content {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically centers content */
}
.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
}
.btn:hover{
    background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;
}

</style>