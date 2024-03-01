<template>
    <div>
      <!-- Your component's template -->
      <div v-if="hasCurrentUser">
        <div class="card">
          <p>Welcome, {{ userDataDoc.username }}!</p>
          <p>Email: {{ currentUser.email }}</p>
          <button class="btn btn-primary">Logout</button>
        </div>
      </div>
      <div v-else>
        <p>No user logged in.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useStoreAuth } from '../stores/storeAuth'
  
  export default {
    data(){
      return {
        currentUser: null,
        userDataDoc: null
      }
    },
    created() {
      this.currentUser = useStoreAuth().getCurrentUser;
      this.userDataDoc = useStoreAuth().getUserDataDoc;

    },
    computed: {
      hasCurrentUser() {
        return useStoreAuth().getCurrentUser;
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