<template>
    <div>
      <div>
        <Sidebar></Sidebar>
      </div>
      <br>
      <!-- Your component's template -->
      <div v-if="hasCurrentUser != null">
        <div class="card">
          <p v-if="userDataDoc" style="margin-bottom: none;">Welcome, {{ userDataDoc.username }}!</p>
          <p v-if="!hasCheckedIn">You still need to check in!</p>
        </div>
      </div>
      <div v-else>
        <p>No user logged in.</p>
      </div>
      <br>
      <div v-if="getCurrentLocation === 'checkIn'">
        <div v-if="!hasCheckedIn">
        <CheckIn></CheckIn>
        </div>
        <div v-else class="card">
          <p>You've already logged in today.</p>
        </div>
      </div>
      <div v-else-if="getCurrentLocation === 'journal'">
        <Journal></Journal>
      </div>
      <div v-else-if="getCurrentLocation === 'statistics'">
        <Statistics></Statistics>
      </div>
      <div v-else-if="getCurrentLocation === 'breathe'">
        <Breath></Breath>
      </div>
      <div v-else-if="getCurrentLocation === 'forum'">
        <Forum></Forum>
      </div>
      <div v-else-if="getCurrentLocation === 'userSettings'">
        <UserSettings></UserSettings>
      </div>
      <div v-else-if="getCurrentLocation === 'logout'">
        <LogOut></LogOut>
        <br>
        <div class="card">
          <button @click="handleLogout" class="btn btn-primary">Log out</button>
        </div>
      </div>
    </div>
    <br>
    <br>
  </template>
  
<script>
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import { useNavigationStore } from '../stores/navigationStore';
import Sidebar from '../components/Sidebar.vue';
import CheckIn from './CheckIn.vue';
import Journal from './Journal.vue';
import Statistics from './Statistics.vue';
import Breath from './Breath.vue';
import Forum from './Forum.vue';
import UserSettings from './UserSettings.vue'
import LogOut from "./LogOut.vue";


  export default {
    components: {
      Sidebar,
      CheckIn,
      Journal,
      Statistics,
      Breath,
      Forum,
      UserSettings,
      LogOut
    },
    data() {
        return {
            currentUser: null,
            userDataDoc: null,
            currentLocation: "checkIn"
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
        const navigationStore = useNavigationStore();
        return { router, navigationStore };
    },
    created() {
        this.currentUser = useStoreAuth().getCurrentUser;
        this.userDataDoc = useStoreAuth().getUserDataDoc;
    },
    computed: {
        hasCurrentUser() {
            return useStoreAuth().getCurrentUser !== null;
        },
        getCurrentLocation(){
          return this.navigationStore.currentLocation;
        },
        hasCheckedIn() {
          return useStoreAuth().hasCheckedIn;
        }
    }
}
</script>
  
<style scoped>
p {
  margin-bottom:0px;
}
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