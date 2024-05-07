<template>
    <div class="card">
      <div class="card-body">
        <h2>{{ entry.journalTitle }}</h2>
        <p>{{ entry.journalDate }}</p>
        <p>{{ entry.journalText }}</p>
        <button class="btn btn-primary" @click="closeDetail">Close</button>
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
        // Emit an event to notify the parent component (Journal.vue) to close the detailed view
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