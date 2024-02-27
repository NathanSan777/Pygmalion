import { defineStore } from "pinia";
import { auth } from "../Firebase/init.js"
import { auth, createUserWithEmailAndPassword } from "firebase/auth";

export const useStoreAuth = defineStore("storeAuth", {
    state: () => {
        return {
            testOutput:"Pinia store is working."
        }
    },

    actions: {

    },

    getters: {

    }

})