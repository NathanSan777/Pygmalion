<template>
  <div class="card">
    <div class="card-body" v-if="!checkInStatus">
    <h1>Daily Check-In</h1>
    <h6>How was your day today?</h6>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" v-model="dayStatus" value="Bad...">
      <label class="btn btn-outline-primary" for="btnradio1" >Bad...</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="dayStatus" value="Okay">
      <label class="btn btn-outline-primary" for="btnradio2">Okay</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" v-model="dayStatus" value="Decent">
      <label class="btn btn-outline-primary" for="btnradio3">Decent</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" v-model="dayStatus" value="Well">
      <label class="btn btn-outline-primary" for="btnradio4">Well</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" v-model="dayStatus" value="Great!" >
      <label class="btn btn-outline-primary" for="btnradio5">Great!</label>
     </div>
     <br> 
     <h6>Have you taken your medication today?</h6>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="medsTaken">
      <label class="form-check-label" :class="{ 'checked': medsTaken}" for="flexSwitchCheckDefault">{{ medsTaken ? 'Yes, I have.' : 'No, I have not.' }}</label>
    </div>
    <br>
    <h6>How many hours of sleep did you get last night?</h6>
    <div class="form-group">
      <input type="number" min="0" max="24" class="form-control" id="userInputForm" placeholder="Hours of sleep" v-model="hoursOfSleep"/>
    </div>
    <br>
    <h6>Write one thing you think went well today.</h6>
    <div class="form-group">
      <input type="text" class="form-control" id="userInputForm" placeholder="Something positive!" v-model="userPositiveThing"/>
    </div>
    <br>
    <h6>Write one thing you think you could improve on for tomorrow.</h6>
    <div class="form-group">
      <input type="text" class="form-control" id="userInputForm" placeholder="Something to improve on"  v-model="userImprovementThing">
    </div>
    <br>
    <button class="btn btn-primary" id="submitButton" @click="submitCheckIn()" :disabled="!checkInStore.isCheckInComplete" >
      Submit
    </button>
  </div>
  <div v-else>
    <p>You've already checked in today!</p>
  </div>
</div>

</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'
import { useCheckInStore } from '../stores/CheckInStore';
import { computed, watch } from 'vue'

export default {
  setup() {
    const checkInStore = useCheckInStore();

    const checkInStatus = computed(() => {
      return useStoreAuth.hasCheckedIn;
    });

    const dayStatus = computed({
      get: () => checkInStore.dayStatus,
      set: (value) => {
        if (value){
          checkInStore.dayStatus = value;
        }
      }
    });
    watch(() => dayStatus.value, (newValue) => {
      checkInStore.dayStatus = newValue;
    });

    const medsTaken = computed({
      get: () => checkInStore.medsTaken,
      set: (value) => {
        checkInStore.medsTaken = value;
      }
    });
    watch(() => medsTaken.value, (newValue) => {
      checkInStore.medsTaken = newValue;
    });

    const hoursOfSleep = computed({
      get: () => checkInStore.hoursOfSleep,
      set: (value) => {
        checkInStore.hoursOfSleep = value;
      }
    });
    watch(() => hoursOfSleep.value, (newValue) => {
      checkInStore.hoursOfSleep = newValue;
    });

    const userPositiveThing = computed({
      get: () => checkInStore.userPositiveThing,
      set: (value) => {
        checkInStore.userPositiveThing = value;
      }
    });

    watch(() => userPositiveThing.value, (newValue) => {
      checkInStore.userPositiveThing = newValue;
    });

    const userImprovementThing = computed({
      get: () => checkInStore.userImprovementThing,
      set: (value) => {
        checkInStore.userImprovementThing = value;
      }
    });
    watch(() => userImprovementThing.value, (newValue) => {
      checkInStore.userImprovementThing = newValue;
    });
    return {
      checkInStore,
      checkInStatus,
      useStoreAuth,
      dayStatus,
      medsTaken,
      hoursOfSleep,
      userPositiveThing,
      userImprovementThing
    }
  },
  methods: {
    submitCheckIn(){
      console.log("Submit button clicked!")
        const checkInData = {
          dayStatus: this.checkInStore.dayStatus,
          medsTaken: this.checkInStore.medsTaken,
          hoursOfSleep: this.checkInStore.hoursOfSleep,
          userPositiveThing: this.checkInStore.userPositiveThing,
          userImprovementThing: this.checkInStore.userImprovementThing,
          timestamp: new Date(),
        };
        console.log("Document constructed. Attempting to add.");
        useStoreAuth().addCheckInToFirestore(checkInData);
        this.checkInStore.clearFields();
      }
    }
  }
</script>

<style scoped>

p{
  align-self: center;
}

input{
  align-self: center;
  text-align: center;
}
.form-control {
    background:transparent;
    border: none;
    border-radius: 0;
    border-bottom: solid black
    
}
.form-control:focus{
    background-color: transparent;
    border: none;
    outline: none;
    text-decoration: underline;
}
.form-control:hover{
    background-color: rgba(0, 0, 0, 0.1);
    transition: 1s;   
}

.checked{
  color:green;
}
.card {
    width: fit-content; 
    height: fit-content;
    margin: auto; 
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; padding: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    padding: 10px;
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
#submitButton.btn:hover{
    background-color: rgba(0, 0, 0, 0.1);
    color: black;
    border-color:black;
    transition: 1s;
}
/* Style for the radio buttons when checked */
#btnradio1:checked + label.btn {
  background-color: red;
  border-color: red;
}

#btnradio1:hover + label.btn {
  border-color: red;
  color: red;
}

#btnradio1:checked + label.btn:hover {
  border-color: red;
  color: white;
}

#btnradio2:checked + label.btn {
  background-color: orange;
  border-color: orange;
}
#btnradio2:hover + label.btn {
  border-color: orange;
  color: orange;
}
#btnradio2:checked + label.btn:hover {
  border-color: orange;
  color: white;
}
#btnradio3:checked + label.btn {
  background-color: gold;
  border-color: gold;
}
#btnradio3:hover + label.btn {
  border-color: gold;
  color: gold;
}
#btnradio3:checked + label.btn:hover {
  border-color: gold;
  color: white;
}

#btnradio4:checked + label.btn {
  background-color: yellowgreen;
  border-color: yellowgreen;
}
#btnradio4:hover + label.btn {
  border-color: yellowgreen;
  color: yellowgreen;
}
#btnradio4:checked + label.btn:hover {
  border-color: yellowgreen;
  color: white;
}

#btnradio5:checked + label.btn {
  background-color: green;
  border-color: green;
}
#btnradio5:hover + label.btn {
  border-color: green;
  color: green;
}
#btnradio5:checked + label.btn:hover {
  border-color: green;
  color: white;
}



</style>