import { defineStore } from 'pinia';

export const useJournalEntryStore = defineStore('journalEntry', {
  state: () => ({
    journalTitle: "",
    journalDate: "",
    journalText: "",
  }),

  actions: {
    discardEntry() {
      this.journalTitle = "";
      this.journalDate = "";
      this.journalText = "";
    },
    setCurrentDate() {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().substr(0, 10);
      this.journalDate = formattedDate;
    }
  }
});
