import { defineStore } from "pinia";
import { auth } from "../Firebase/init.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { query, where, doc, addDoc,updateDoc, collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../Firebase/init.js'
import { useNavigationStore } from "./navigationStore.js";
import { useJournalStore } from "./journalStore.js";
import { useCheckInStore } from "./CheckInStore.js";

export const useStoreAuth = defineStore("storeAuth", {
    id: 'auth',
    state: () => ({
       isLoggedIn: false,
       hasCheckedIn: false,
       user: null,
       userData: null,
       userProfileColor: "",
       userBackground: ''

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
                this.isLoggedIn = true;
                this.user = user;

                if (userData){
                    this.userData = userData;
                    console.log("Data fetched: ", userData);
                    // After fetching user data, also fetch user settings
                    const userSettings = await this.fetchUserSettings(user.uid);
                    if (userSettings) {
                        this.userSettings = userSettings;
                        console.log("User settings fetched: ", userSettings);
                    } else {
                        console.error("User settings not found for user ID:", user.uid);
                    }
                    const checkInToday = await this.getCheckInForToday();
                    if (checkInToday) {
                        this.hasCheckedIn = true;
                    } else {
                        this.hasCheckedIn = false;
                    }
                }
                else{
                    console.error("User data not found for user ID:", user.uid)
                }
                
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
        },
        async fetchUserDocRef(userId){
            try {
                const q = query(collection(db, "users"), where("uid", "==", userId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDocSnapshot = querySnapshot.docs[0];
                    return userDocSnapshot.ref; // Return the document reference instead of the data
                } else {
                    console.error("User data not found for user ID: ", userId);
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
                throw error;
            }

        },

        async initializeAuthState(){
            auth.onAuthStateChanged(async user => {
                if (user) {
                    console.log("Inside the auth state: logged in.")
                    this.isLoggedIn = true;
                    this.user = user;
                    try {
                        this.userData = await this.fetchUserData(user.uid);
                        //this.userSettings = await this.fetchUserSettings();
                    } catch (error) {
                        console.error('Error fetching user data or settings:', error);
                        // Handle error as needed
                    }
                }
                else{
                    this.isLoggedIn = false;
                    this.user = null;
                }
            });
        },
        async logOutUser(){
            console.log("Attempting try-catch statement")
            try {
                console.log("Attempting to sign user out...")
                await auth.signOut();
                console.log("Received confirmation.")
                useNavigationStore().setCurrentLocation('checkIn');
                this.isLoggedIn = false;
                this.user = null;
                this.userData = null;
                console.log("User logged out.")
            } catch(error) {
                console.error("Failed to log out user",  error);
                throw error;
            }
        },
            async addCheckInToFirestore(checkInData){
                try {
                    const user = auth.currentUser;
                    console.log("User obtained");
                    if (user){
                        const userDocRef = await this.fetchUserDocRef(user.uid);
                        if (userDocRef){
                            const checkInsCollectionRef = collection(userDocRef, 'checkIns');
                            await addDoc(checkInsCollectionRef, checkInData);
                            console.log("Check-in data added to Firestore: ", checkInData);
                        }
                        else{
                            console.error("User document not found for user ID: " + user.uid);
                        }
                    } else {
                        console.error("No user is currently logged in.");
                    }
                } catch(error) {
                    console.error("Error adding check-in data: ", error);
                    throw error;
            }
          },
        async getCheckInForToday(){
            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("No user is currently logged in");
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const userDocRef = await this.fetchUserDocRef(user.uid);
                if (!userDocRef) {
                    console.error("User document not found for user ID: ", user.uid);
                    return null;
                }

                const checkInsCollectionRef = collection(userDocRef, 'checkIns');
                const querySnapshot = await getDocs(query(checkInsCollectionRef, where("timestamp", ">=", today)));
                if (!querySnapshot.empty) {
                    // A check-in exists for today
                    console.log("User has checked in today!")
                    return querySnapshot.docs[0].data();
                } else {
                    // No check-in exists for today
                    console.log("User has not checked in today...");
                    return null;
                }
            } catch (error) {
                console.error("Error fetching check-in for today: ", error);
                throw error;
            }
        },
        async getCheckIns(){
            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("No user is currently logged in");
                }
                const userDocRef = await this.fetchUserDocRef(user.uid);
                if (userDocRef){
                    const checkInsCollectionRef = collection(userDocRef, 'checkIns');
                    const querySnapshot = await getDocs(checkInsCollectionRef);
                    const checkIns = [];
                    querySnapshot.forEach((doc) => {
                        checkIns.push(doc.data());
                    });
                    console.log("Check-ins retrieved in storeAuth:", checkIns);
                    return checkIns;
                }
                else{
                    console.error("User document not found for userID: " + user.uid);
                    return [];
                }
            } catch (error) {
                console.error("Error fetching check-ins:", error);
                throw error;
            }
        },

        async addJournalEntry(entryData) {
            try {
                const user = auth.currentUser;
                if(!user){
                    throw new Error("No user is currently logged in...")
                }
                const userDocRef = await this.fetchUserDocRef(user.uid);
                if (!userDocRef){
                    throw new Error("User document not found for user ID: " + user.uid)
                }
                const journalEntriesCollectionRef = collection(userDocRef, 'journalEntries');
                await addDoc(journalEntriesCollectionRef, entryData);
                console.log("Journal entry added to Firestore: ", entryData);
                useJournalStore().hideJournalEntry();
            } catch(error){
                console.error("Error adding journal entry:  ", error);
                throw error;
            }    
        },
        async getJournalEntries(){
            try {
                const user = auth.currentUser;
                if (user){
                    const userDocRef = await this.fetchUserDocRef(user.uid);
                    if (userDocRef){
                        const journalEntriesCollectionRef = collection(userDocRef, 'journalEntries');
                        const querySnapshot = await getDocs(journalEntriesCollectionRef);
                        const entries = [];
                        querySnapshot.forEach((doc) => {
                            entries.push(doc.data());
                        });
                        console.log("Journal entries retrieved in storeAuth.js:", entries)
                        console.log(Array.isArray(entries));
                        return entries;
                    } else {
                        console.error("User document not found for userID: " + user.uid);
                        return [];
                    }
                }
            } catch(error) {
                console.error("Error fetching journal entries: ", error);
                throw error;
            }
        },
        async getJournalEntriesForDate(date){
            try {
                const user = auth.currentUser;
                if(user){
                    const userDocRef = await this.fetchUserDocRef(user.uid);
                    if (userDocRef){
                        const journalEntriesCollectionRef = collection(userDocRef, 'journalEntries');
                        const querySnapshot = await getDocs(query(journalEntriesCollectionRef, where('date', '==', date)));
                        const entries = [];
                        querySnapshot.forEach((doc) => {
                            entries.push(doc.data());
                        });
                        console.log("Journal entries retrieved for date " + date + ":", entries);
                        return entries;
                    } else{
                        console.error("User document not found for user ID:  " + user.uid);
                        return [];
                    }
                } else {
                    console.error("No user is currently logged in.");
                    return [];
                }
            } catch (error) {
                console.error("Error fetching journal entries for date " + date + ":", error);
                throw error;
            }
        },

        async updateUserSettings(profileColor, background) {
            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("No user is currently logged in");
                }
                
                const userDocRef = await this.fetchUserDocRef(user.uid);
                const userSettingsCollectionRef = collection(userDocRef, 'userSettings');
                const querySnapshot = await getDocs(userSettingsCollectionRef);
                if (!querySnapshot.empty){
                    const userSettingDocRef =  querySnapshot.docs[0].ref;

                    await updateDoc(userSettingDocRef, {
                        profileColor,
                        background
                    });
                // Update local state
                this.userSettings = { profileColor, background };

                console.log('User settings updated successfully');
                console.log("User settings fetched in storeAuth: ", this.userSettings);
                } else {
                    console.error("No user settings document found...");
                }
            } catch (error) {
                console.error('Error updating user settings:', error);
                throw error;
            }
        },

        async fetchUserSettings(){
            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("No user is currently logged in");
                }
                const userDocRef = await this.fetchUserDocRef(user.uid);
                console.log("User doc ref is ", userDocRef)
                const userSettingCollectionRef = collection(userDocRef, 'userSettings');
                const querySnapshot = await getDocs(userSettingCollectionRef);
                console.log("Query snapshot is ",querySnapshot);

                if (!querySnapshot.empty){

                    const userSettingsDocSnapshot = querySnapshot.docs[0];
                    const userSettingsData = userSettingsDocSnapshot.data();
                    console.log(userSettingsData);
                    this.userSettings = userSettingsData;
                    console.log("User settings fetched in storeAuth:", userSettingsData);
                    this.userProfileColor = userSettingsData.profileColor;
                    this.background = userSettingsData.background;
                    console.log(this.userProfileColor, this.background);
                    return userSettingsData;
                }
                else {
                    console.error("No settings found.");
                }
        } catch (error){
            console.error("Error fetching user settings:", error);
            throw error;
        }
    }
},
    
    getters: {
        getLogInStatus(){
            if (this.isLoggedIn){
                return this.isLoggedIn;
            }
        },
        getCurrentUser(){
            return this.isLoggedIn ? this.user : null;
        },
        getUserDataDoc(){
            if (this.isLoggedIn){
                return this.userData
            }
        },
        getCurrentUserName(){
            if (this.isLoggedIn){
                return this.userData.name;
            }
        },
        getCurrentUserEmail(){
            if (this.isLoggedIn){
                return this.userData.email;
            }
        },
        getCurrentUserID(){
            if (this.isLoggedIn){
                return this.userData.uid;
            }
        }
    }
})