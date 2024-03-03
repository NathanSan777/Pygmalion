<template>
    <div>
      <div>
        <Sidebar></Sidebar>
      </div>
      <br>
      <!-- Your component's template -->
      <div v-if="hasCurrentUser != null">
        <div class="card">
          <p v-if="userDataDoc">Welcome, {{ userDataDoc.username }}!</p>
          <p v-if="currentUser">Email: {{ userDataDoc.email }}</p>
          <button v-if="hasCurrentUser" @click="handleLogout" class="btn btn-primary">Logout</button>
        </div>
      </div>
      <div v-else>
        <p>No user logged in.</p>
      </div>

      
    </div>
  </template>
  
<script>
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import Sidebar from '../components/Sidebar.vue';
  
  export default {
    components: {
      Sidebar
    },
    data() {
        return {
            currentUser: null,
            userDataDoc: null
        };
    },
    methods: {
        async handleLogout() {
            try {
                await useStoreAuth().logOutUser();
                this.currentUser = null;
                this.userDataDoc = null;
                console.log("Dashboard Component: User successfully logged out.");
                console.log("hasCurrentUser: ", this.hasCurrentUser);
                this.router.push('/auth');
            }
            catch (error) {
                console.error("Error logging out: ", error);
            }
        },
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    created() {
        this.currentUser = useStoreAuth().getCurrentUser;
        this.userDataDoc = useStoreAuth().getUserDataDoc;
    },
    computed: {
        hasCurrentUser() {
            return useStoreAuth().getCurrentUser !== null;
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
.btn:hover{
    background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;
}
</style>