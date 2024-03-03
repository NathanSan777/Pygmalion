
<template>  
    <div class="card">
        <div class="container" id="logo">
            <h1>Pygmalion</h1>
            <h4>Craft your ideal self</h4>
        </div>
    </div> 
    <br>
    <br>
    <br>
    <div class="card">
            <div class="container">
                <div class="row" style="padding: 5px;">
                    <div class="row-md-6" >
                        <ul class="nav nav-pills" >
                            <li :class="{ 'active': activeTab === 'login' }" class="flex-fill">
                                <a @click.prevent="onToggle('login')"  href="#" class="nav-link">Login</a>
                            </li>
                            <li :class="{ 'active': activeTab === 'register' }" class="flex-fill">
                                <a @click.prevent="onToggle('register')" href="#" class="nav-link">Register</a>
                            </li>
                        </ul>
                        <div class="tab-content mt-3">
                            <div v-if="activeTab === 'login'" class="tab-pane fade show active">
                            <h3 style="margin: auto; text-align: center;" >Welcome back!</h3>
                            <!-- Your login form here -->
                            <form>
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="email" class="form-control" v-model="loginEmail" aria-describedby="emailHelp" placeholder="Email">
                                        <span class="material-symbols-outlined" style="margin-left: 2px;">mail</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="password" class="form-control" v-model="loginPassword" placeholder="Password">
                                        <span class="material-symbols-outlined" style="margin-left: 2px;">lock</span>
                                    </div>
                                </div>
                            </form>
                            <br>
                                <button @click="login()" :disabled="!isLoginComplete" class="btn btn-primary" style="">Login</button>
                            </div>
                            <div v-if="activeTab === 'register'" class="tab-pane fade show active">
                            <h3 style="margin: auto; text-align: center;">Glad you're joining!</h3>
                            <!-- Your registration form here -->
                            <form>
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="email" class="form-control" v-model="registrationUsername" aria-describedby="emailHelp" placeholder="Username">
                                        <span class="material-symbols-outlined" style="margin-left: 2px; ">person</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="email" class="form-control" v-model="registrationEmail" aria-describedby="emailHelp" placeholder="Email">
                                        <span class="material-symbols-outlined" style="margin-left: 2px;">mail</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-box">
                                        <input type="password" class="form-control" v-model="registrationPassword" placeholder="Password">
                                        <span class="material-symbols-outlined" style="margin-left: 2px;">lock</span>
                                    </div>
                                </div>
                            </form>
                            <br>
                                <button @click="register()" :disabled="!isRegistrationComplete" class="btn btn-primary" >Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  </template>
  

  <script>
//   import { mapActions } from 'pinia'
//   import { auth } from "../Firebase/init.js"
//   import { createUserWithEmailAndPassword} from "firebase/auth"
//   import db from '../Firebase/init.js'
//   import { doc, collection, addDoc } from 'firebase/firestore'
  import { useStoreAuth } from '../stores/storeAuth'
  import { useRouter} from 'vue-router'
  export default {
    data() {
      return {
        activeTab: 'login', // Default active tab is login
        loginEmail: "nathan@gmail.com",
        loginPassword: "testing1",

        registrationUsername: "",
        registrationEmail: "",
        registrationPassword: "",
      };
    },
    setup(){
        const router = useRouter();
        return { router };
    },
    methods: {
        async register(){
            try {
                await useStoreAuth().register(this.registrationEmail, this.registrationPassword, this.registrationUsername)
                this.router.push('/dashboard')
            } catch(error) {
                console.error("registration failed:  ", error);

            }
        },
        async login(){
            try {
                await useStoreAuth().login(this.loginEmail, this.loginPassword);
                this.router.push('/dashboard')
            } catch(error){
                console.error("Login failed:  ", error.message);
                alert("Login failed! Please check the email or password you submitted.")
            }
        },
        onToggle(tab){
            if (this.activeTab !== tab) {
                this.activeTab = tab;
                console.log("Currently on the " + tab + " page...");
            }     
        }, 
    },
    computed: {
        isLoginComplete(){
            if (this.loginEmail.trim() != ""
            && this.loginPassword.trim() != ""){
                return true;
            }
            else{
                return false;
            }
        },
        isRegistrationComplete(){
            if (this.registrationUsername.trim() != ""
            && this.registrationEmail.trim() != ""
            && this.registrationPassword.trim() != ""){
                return true;
            }
            else{
                return false;
            }
        },
    }
  };
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

#logo{
    height: fit-content;
    width: fit-content;
    justify-content: center; 
    display: flex;
    flex-direction: column;
    align-items: center;
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


.input-box {
    justify-content: right;
    display: flex;
    font-family: "Montserrat";
}
.material-symbols-outlined{
    margin: auto;
}
.form-group{
    padding: 5px; 
    margin: auto;
}

h1 {
    font-size: 70px;
    margin: auto;
    font-family: "Montserrat";
    font-weight: 700;
    
}

h3{
    padding-bottom: 10px;
    font-family: "Montserrat";
}

h4{
    font-family: "Montserrat";
}

a
{
    justify-content: center;
    align-items: center;
    display: flex;
    color: black;
}
input {
    background:transparent;
    border: none;
    border-radius: 0;
    border-bottom: solid black
    
}
input:focus{
    background-color: transparent;
    border: none;
    outline: none;
    text-decoration: underline;
}
input:hover{
    background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;   
}

span{
    position: right;
}

</style>