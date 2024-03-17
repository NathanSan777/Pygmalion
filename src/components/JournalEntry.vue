<template>
    <div class="card">
      <div class="card-body">
          <h1>New Journal Entry</h1>
          <div class="form-group">
            <input type="text" class="form-control" id="userInputForm" placeholder="Title" v-model="journalTitle"/>
          </div>
          <br>
          <div class="form-group">
            <input type="text" class="form-control" id="userInputForm" placeholder="Date" v-model="journalDate" readonly/>
          </div>
          <br>
          <div class="form-group">
            <div class="prompt-container">
              <h6>Anything you're looking forward to?</h6>
              <h6>Anything you're worried about?</h6>
              <h6>Anything you're looking forward to?</h6>
              <h6>Feel free to write about your day.</h6>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="journalText"></textarea>
          </div>
          <br>
          <div class="button-flex">
            <button class="btn btn-primary" @click="discardNewEntry()" >Discard</button>
            <button @click="submitJournalEntry()" class="btn btn-primary">Submit</button>
          </div>
          </div>
        </div>
      </div>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'
import { useJournalStore } from '../stores/journalStore'
import { useJournalEntryStore } from '../stores/journalEntryStore'

export default {
    data() {
      return {
        journalEntryStore: useJournalEntryStore(),
        currentUser: null,
        journalTitle: '',
        journalText: ''
      }
    },
    computed: {
      journalDate() {
        return this.journalEntryStore.journalDate;
    },

    },
    methods: {
      discardNewEntry(){
        this.journalEntryStore.discardEntry();
        useJournalStore().hideJournalEntry();
      },
      updateJournalTitle(title){
        this.journalTitle = title;
      },
      updateJournalText(text){
        this.journalText = text;
      },
      async submitJournalEntry(){
        const entryData = {
          journalTitle: this.journalTitle,
          journalDate: this.journalEntryStore.journalDate,
          journalText: this.journalText
        };
        
        try{
          await useStoreAuth().addJournalEntry(entryData);
          console.log("Journal entry submitted successfully!")
        } catch{
          console.error("Error submitting journal entry:", error);
        }
      }
    },

    created(){
      this.journalEntryStore.setCurrentDate();
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

.prompt-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
input{
    align-self: center;
    text-align: center;
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
.button-flex{
  display: flex;
  justify-content: space-around;
  flex-direction: row;

}
</style>
