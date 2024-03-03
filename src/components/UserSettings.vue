<template>
    <div class="card">
          <p>You're currently in the User Settings view!</p>
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

<style>
.card {
    width: fit-content; 
    height: fit-content;
    margin: auto; 
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; padding: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
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
</style>