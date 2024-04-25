<template>
    <div class="card">
          <p>You're currently in the Forum view!</p>
          <p>Soon to be implemented!</p>
        </div>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'

export default {
    data() {
      return {
        currentUser: null,
        userDataDoc: null
      }
    },
}
</script>

<style scoped>
.card {
    width: fit-content; 
    height: fit-content;
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; 
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.entry-card {
    width: 75%; /* Ensures each card takes up full width */
    margin-bottom: 5px; /* Adjust as needed for spacing between cards */
    padding: 0;
    cursor: pointer;
}
.entry-content {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  
}
.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
 
}
.journal-title {
  margin-right: 10px; /* Add space between title and date */
}
.journal-date {
  margin-left: auto; /* Add space between date and title */
}


.btn, .btn-primary{
    background-color: transparent;
    border-color: black;
    color: black;  
    font-family: "Montserrat";
    font-weight: bold; 
    text-align: center; 
    display: block;  
    margin: auto;
    box-shadow: 0 0 30px rgba(182, 208, 226, 0.2);
}
.btn:hover{
    background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;
}
.entry-card:hover{
  background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;
}

.pagination-pills .page-item {
    display: inline-block;
}

.pagination-pills .page-item .page-link {
    background-color: hsla(0, 0%, 100%, 0.45);;
    border-color: black;
    color: black;
    border-radius: 20px; /* Adjust the border-radius to your preference */
    margin: 0 5px; /* Adjust the spacing between pills */
}

.pagination-pills .page-item.active .page-link {
    background-color: rgba(0, 0, 0, 0.1); /* Change to the desired active pill background color */
    color: black; /* Change to the desired active pill text color */
    border-color: black; /* Change to the desired active pill border color */
}
</style>