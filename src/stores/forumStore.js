import { defineStore } from 'pinia';
import { query, where, doc, addDoc, updateDoc, collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../Firebase/init.js'

export const useForumStore = defineStore("forumStore", {
    state: () => ({
        showNewForumPost: false,
        forumPostEntries: [],
        perPage: 5,
        currentPage: 1
    }),
    methods: {
       async fetchForumPosts(){
        console.log("Fetching forum posts. inside store")
            try {
                
                const forumCollectionRef = collection(db,'forum');
                console.log("Forum collection Ref", forumCollectionRef);

                const querySnapshot = await getDocs(forumCollectionRef);

                const forumPosts = [];

                querySnapshot.forEach(doc => {
                    forumPosts.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                console.log("Posts obtained", forumPosts)

                this.forumPostEntries = forumPosts;
                console.log("In the store:", this.forumPostEntries)
                return forumPosts;
            }
            catch(error){
                console.error("Error fetching forum posts:", error);
                throw error;
            }
        },
    }
})