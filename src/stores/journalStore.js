import { defineStore } from 'pinia';
import { useJournalEntryStore } from './journalEntryStore';
import { useStoreAuth } from './storeAuth';

export const useJournalStore = defineStore('journal', {
  state: () => ({
    showNewEntry: false,
    journalEntries: [],
    perPage: 5,
    currentPage: 1
  }),
  actions: {
    createNewJournalEntry() {
      const journalEntryStore = useJournalEntryStore();
      journalEntryStore.setCurrentDate();
      this.showNewEntry = true;
      console.log('showNewEntry: ', this.showNewEntry);
    },
    hideJournalEntry() {
        this.showNewEntry = false;
        console.log('showNewEntry: ', this.showNewEntry);
    },
    async fetchJournalEntries(){
        const entries = await useStoreAuth().getJournalEntries();
        console.log("Checking to see if this is an array: ", Array.isArray(entries));
        console.log("Inside journalStore.js. Fetched journal entries: ", entries)
        if (Array.isArray(entries)) {
            this.journalEntries = entries;
        } else{
            console.error("Invalid journal entries format: ", entries);
            this.journalEntries = [];
        }
        
    }
  }
});
