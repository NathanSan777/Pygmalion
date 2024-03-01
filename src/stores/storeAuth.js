import { defineStore } from "pinia";
import { auth } from "../Firebase/init.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { query, where, doc, addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../Firebase/init.js'

export const useStoreAuth = defineStore("storeAuth", {
    id: 'auth',
    state: () => ({
       isLoggedIn: false,
       user: null,
       userData: null
    }),

    actions: {
        async register(email, password, username){
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                await addDoc(collection(db, 'users'), {
                    email: email,
                    username: username, 
                    password: password,
                    uid: user.uid
                })
                const userData = await this.fetchUserData(user.uid)
                if (userData) {
                    // Update the userData state with the retrieved user data
                    this.userData = userData;
                    console.log("User data fetched:", userData);
                  } else {
                    console.error("User data not found for user ID:", user.uid);
                }
                this.isLoggedIn = true
                this.user = user
                console.log("User registered: ", user)
            }
            catch(error){
                console.error("Error registering user:  ", error)
                throw error
            } 
        },
        async login(email, password){
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const userData = await this.fetchUserData(user.uid);

                if (userData){
                    this.userData = userData;
                    console.log("Data fetched: ", userData);
                }
                else{
                    console.error("User data not found for user ID:", user.uid)
                }
                
                this.isLoggedIn = true;
                this.user = user;
                console.log("User logged in: ", userCredential.user);
                console.log("Email is ", userCredential.email)
            } catch(error){
                console.error("Error logging in:  ", error)
                throw error;
            }
        },

        async fetchUserData(userId){
            try{
                const q = query(collection(db, "users"), where("uid", "==", userId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty){
                    const userDocSnapshot = querySnapshot.docs[0];
                    return userDocSnapshot.data();
                } else {
                    console.error("User data not found for user ID: ", userId);
                    return null;
                }
                
            } catch(error) {
                console.error("Error fetching user data: ", error);
                throw error;

            }
        }
        },
        setCurrentUser(user){
            this.currentUser = user;
        },
        async initializeAuthState(){
            auth.onAuthStateChanged(user => {
                if (user) {
                    this.isLoggedIn = true;
                    this.user = user;
                }
                else{
                    this.isLoggedIn = false;
                    this.user = null;
                }
            })
        },
    getters: {
        getLogInStatus(){
            return this.isLoggedIn;
        },
        getCurrentUser(){
            return this.isLoggedIn ? this.user : null;
        },
        getUserDataDoc(){
            return this.userData
        },
        getCurrentUserName(){
            return this.userData.name;
        },
        getCurrentUserEmail(){
            return this.userData.email;
        },
        getCurrentUserID(){
            return this.userData.uid;
        }
    }

})