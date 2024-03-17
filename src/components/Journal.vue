<template>
  <div v-if="!showNewEntry">
    <div class="card">
      <div class="card-body">
          <h1>My Journal</h1>
          <button @click="createNewJournalEntry" class="btn btn-primary">New Entry</button>
          <br>
          <p v-if="userJournalEntries.length === 0"> You currently have no entries.</p>
          <div v-else>
            <div v-for="entry in fetchedJournalEntries" :key="entry.id">
              <!-- Display journal entry details -->
              <div class="card">
                <div class="card-body" style="display: flex; flex-direction: row;">
                  <p>Title: {{ entry.journalTitle }}</p>
                  <p>Date: {{ entry.journalDate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-auto">
          <div class="mt-3">
            <b-pagination v-model="currentPage" pills :total-rows="perPage"></b-pagination>
          </div>
        </div>
      </div>
    </div>
      <div v-if="showNewEntry">
        <div class="card-body">
        <JournalEntry>

        </JournalEntry>
      </div>
      </div>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'
import { useJournalStore } from '../stores/journalStore';
import JournalEntry from './JournalEntry.vue';
export default {
 
  data() {
      return {
        showNewEntry: false,
        userJournalEntries: []
      }
    },
    components: {
      JournalEntry
    },

    computed: {
    fetchedJournalEntries() {
      return useJournalStore().journalEntries;
      },

    perPage() {
      return useJournalStore().perPage;
      },

    currentPage() {
      return useJournalStore().currentPage;
      },
    showNewEntry(){
        return useJournalStore().showNewEntry;
      }
    },
    methods: {
      createNewJournalEntry(){
        useJournalStore().createNewJournalEntry();
      },
      // async fetchEntries(){
      //   try {
          
      //     console.log("Journal entries:", journalEntries);
      //   } catch(error){
      //     console.error("Error fetching journal entries:", error);
      //   }
      // } 
    },
    created() {
    this.userJournalEntries = useJournalStore().fetchJournalEntries();
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
.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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