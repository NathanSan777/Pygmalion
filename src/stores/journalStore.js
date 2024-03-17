import { defineStore } from 'pinia';
import { useJournalEntryStore } from './journalEntryStore';
import { useStoreAuth } from './storeAuth';

export const useJournalStore = defineStore('journal', {
  state: () => ({
    showNewEntry: false,
    journalEntries: [],
    perPage: 10,
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
        this.journalEntries = entries;
    }
  }
});
