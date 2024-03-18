<template>
  <div v-if="!showDetail" style="width: 100%; display: flex; justify-content: center;">
  <div v-if="!showNewEntry" style="width: fit-content; height: fit-content;">
    <div class="card">
      <div class="card-body" style="max-width: 600px; overflow-x: auto;">
          <h1>My Journal</h1>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button @click="setView('calendar')" class="btn btn-primary" style="flex-grow: 1;">Calandar</button>
            <button @click="createNewJournalEntry" class="btn btn-primary" style="flex-grow: 1;">New Entry</button>
            <button @click="setView('list')" class="btn btn-primary" style="flex-grow: 1;">List View</button>
          </div>
          <br>
          <p v-if="userJournalEntries.length === 0"> You currently have no entries.</p>
          <div v-else>
            <div v-if="currentListView === 'list'" class="row">
              <div class="col-mid-4" v-for="entry in paginatedEntries" :key="entry.id">
                <!-- Display journal entry details -->
                  <div @click="showEntryDetail(entry)" class="card entry-card">
                    <div class="card-body entry-content" style="display: flex; flex-direction: row;">
                      <h2 class="journal-title">{{ entry.journalTitle }}</h2>
                      <h6 class="journal-date">{{ entry.journalDate }}</h6>
                    </div>
                  </div>
              </div>
            </div>
            <div v-else-if="currentListView ==='calendar'">
              <div ref="calendar"></div>
            </div>
          </div>
        </div>
        <nav v-if="currentListView === 'list'" aria-label="Page navigation">
          <ul class="pagination justify-content-center pagination-pills">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
  </div>
</div>
  <div class="card" v-if="showNewEntry" style="background:none;">
    <div class="card-body">
      <JournalEntry>
      </JournalEntry>
    </div>
  </div>
  <JournalEntryDetail v-if="showDetail" :entry="selectedEntry" @close="closeEntryDetail"></JournalEntryDetail>
</template>

<script>
import {ref} from 'vue';
import { useStoreAuth } from '../stores/storeAuth'
import { useJournalStore } from '../stores/journalStore';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import JournalEntry from './JournalEntry.vue';
import JournalEntryDetail from './JournalEntryDetail.vue';

export default {
  data() {
      return {
        showNewEntry: false,
        userJournalEntries: [],
        showDetail: false,
        selectedEntry: null,
        currentListView: 'list',
        calendarEvents: [],
        calendar: null
      }
    },
    components: {
      JournalEntry,
      JournalEntryDetail,
      FullCalendar
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
      },
    sortedEntries(){
        return this.userJournalEntries.sort((a,b) => new Date(b.journalDate) - new Date(a.journalDate));
      },
    paginatedEntries(){
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.sortedEntries.slice(startIndex, endIndex);
      },
    totalPages(){
        return Math.ceil(this.userJournalEntries.length / this.perPage);
      },
    calendarPlugins() {
      return [dayGridPlugin, interactionPlugin];
    },
    calendarEvents() {
      return [];
    },

    },
    methods: {
      async createNewJournalEntry(){
        try{
          await useJournalStore().createNewJournalEntry();
          const entries = await useStoreAuth().getJournalEntries();
          this.userJournalEntries = entries;
        } catch(error) {
          console.error("Error creating new journal entry:", error);
        }
      },
      async fetchJournalEntriesByDate(date){
        try{
          const entriesByDate = await useStoreAuth().getJournalEntriesForDate(date);
          return entriesByDate;
        } catch(error) {
          console.error("Error fetching journal entries for date:", error);
          throw error;
        }

      },
      changePage(page){
        if (page >= 1 && page <= this.totalPages) {
          useJournalStore().currentPage = page;
        }
      },
      showEntryDetail(entry){
        this.showDetail = true;
        this.selectedEntry = entry; 
      },
      closeEntryDetail(){
        this.showDetail = false;
        this.selectedEntry = null;
      },
      setView(view){
        this.currentListView = view;
        if (view === 'calendar'){
          this.renderCalendar();
        }
      },
      async handleDateClick(info){
        const selectedDate = info.dateStr;
        try{
          const entries = await this.fetchJournalEntriesByDate(selectedDate);
          console.log('Journal entries for date', selectedDate, ":", entries);
        } catch(error){
          console.error("Error handling date click: ", error);
        }
      },
      renderCalendar(){
        if (!this.calendar) {
        this.calendar = new FullCalendar.Calendar(this.$refs.calendar, {
          plugins: this.calendarPlugins,
          initialView: 'dayGridMonth',
          events: this.calendarEvents,
          dateClick: this.handleDateClick,
        });
        this.calendar.render();

      }
    }
  },
    created() {
      (async () => {
        try{
          const entries = await useStoreAuth().getJournalEntries();
          console.log("Inside Journal.vue: is userJournalEntries an array? " + Array.isArray(entries));
          if(Array.isArray(entries)) {
            this.userJournalEntries = entries;
            useJournalStore().journalEntries = entries;
          } else {
            console.error("Journal entries fetched is not an array:", entries);
          }
        } catch(error){
          console.error("Error fetching journal entries:  ", error);
        }

      })();
  }
}
</script>

<style scoped>
.card {
    width: fit-content; 
    height: fit-content;
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; 
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.entry-card {
    width: 75%; /* Ensures each card takes up full width */
    margin-bottom: 5px; /* Adjust as needed for spacing between cards */
    padding: 0;
    cursor: pointer;
}
.entry-content {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  
}
.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
 
}
.journal-title {
  margin-right: 10px; /* Add space between title and date */
}
.journal-date {
  margin-left: auto; /* Add space between date and title */
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
.entry-card:hover{
  background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;
}

.pagination-pills .page-item {
    display: inline-block;
}

.pagination-pills .page-item .page-link {
    background-color: hsla(0, 0%, 100%, 0.45);;
    border-color: black;
    color: black;
    border-radius: 20px; /* Adjust the border-radius to your preference */
    margin: 0 5px; /* Adjust the spacing between pills */
}

.pagination-pills .page-item.active .page-link {
    background-color: rgba(0, 0, 0, 0.1); /* Change to the desired active pill background color */
    color: black; /* Change to the desired active pill text color */
    border-color: black; /* Change to the desired active pill border color */
}
</style>