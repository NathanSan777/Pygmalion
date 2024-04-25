<template>
 <div>
    <div class="card">
      <div class="card-body">
      <h1>My Statistics</h1>
      <div v-if="checkIns.length > 0" class="card-body">
        <h3>Check-Ins</h3>
        <div class="card">
          <DayGraph :chartData="dayData"></DayGraph>
        </div>
        <p class="statistic">Total Check-ins: {{ checkIns.length }}</p>
        <br>
        <br>
        <h3>Medication</h3>
        <div class="card">
          <MedsTakenGraph :medsData="medsData"></MedsTakenGraph>
        </div>
        <p class="statistic">Days where you've taken your meds: {{ medsTakenCount}}</p>
        <p class="statistic" v-if="medsTakenCount / checkIns.length >= 0.75">Good job! You've taken your meds over {{ ((medsTakenCount / checkIns.length) * 100).toFixed(2) }}% of the time! Keep up the good work.</p>
        <br>
        <h3>Sleep</h3>
        <div class="card">
          <SleepGraph :sleepData="sleepData"></SleepGraph>
        </div>
        <p class="statistic">Total sleep logged: {{ totalSleep }} hours</p>
        <p class="statistic">Average hours of sleep per night: {{ totalSleep / checkIns.length }} hours</p>
        <p class="statistic" v-if="totalSleep / checkIns.length > 6">Way to go! You're getting at least 6 hours of sleep each night.</p>
      </div>
      
      <div v-else>
        <p class="statistic">No check-in data available.</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'
import DayGraph from './DayGraph.vue';
import MedsTakenGraph from './MedsTakenGraph.vue';
import SleepGraph from './SleepGraph.vue'

export default {
  components: {
    DayGraph,
    MedsTakenGraph,
    SleepGraph
  },

    data() {
      return {
        currentUser: null,
        userDataDoc: null,
        checkIns: [],
        dayData: null,
        badDayCount: 0,
        okayDayCount: 0,
        decentDayCount: 0,
        wellDayCount: 0,
        greatDayCount: 0,
        medsTakenCount: 0,
        medsData: null,
        totalSleep: 0.0,
        sleepData: null
      }
    },
    created() {
      this.fetchCheckIns();
    },
    methods: {
      async fetchCheckIns(){
        try {
          this.checkIns = await useStoreAuth().getCheckIns();
          this.calculateData();
          this.calculateMedsData();
          this.calculateSleepData();
        } catch (error) {
          console.error("Error fetching check-ins: ", error);
        }
      },
      calculateData(){

        const data = {
        labels: ['Bad Days', 'Okay Days', 'Decent Days', 'Well Days', 'Great Days'],
        data: [0, 0, 0, 0, 0], // Initialize counts
      };

      this.checkIns.forEach(checkIn => {
        // Update counts based on check-in data
        // Example logic: assuming each check-in has a "mood" field
        switch (checkIn.dayStatus) {
          case 'Bad...':
            this.badDayCount++;
            data.data[0]++;
            break;
          case 'Okay':
            this.okayDayCount++;
            data.data[1]++;
            break;
          case 'Decent':
            this.decentDayCount++;
            data.data[2]++;
            break;
          case 'Well':
            this.wellDayCount++;
            data.data[3]++;
            break;
          case 'Great!':
            this.greatDayCount++;
            data.data[4]++;
            break;
          default:
            break;
        }
        this.dayData = data;

        // Update medsTakenCount based on check-in data
        // Example logic: assuming each check-in has a "medsTaken" field
        if (checkIn.medsTaken) {
          this.medsTakenCount++;
        }

        // Update totalSleep based on check-in data
        // Example logic: assuming each check-in has a "sleepDuration" field
        this.totalSleep += checkIn.hoursOfSleep;
      });
    },
    calculateMedsData(){
      // Calculate the number of days with medication taken
      const medsTakenCount = this.checkIns.filter(checkIn => checkIn.medsTaken).length;

      // Update the meds data property
      this.medsData = {
        totalCheckIns: this.checkIns.length,
        medsTakenCount: medsTakenCount
      };
    },
    calculateSleepData() {
      // Calculate sleep data
      const sleepData = []; // Initialize an array to store sleep data
      this.checkIns.forEach(checkIn => {
        // Assuming each check-in has a "date" and "hoursOfSleep" property
        sleepData.push({ timestamp: checkIn.timestamp, hoursOfSleep: checkIn.hoursOfSleep });
        // Update totalSleep based on check-in data
      });
      this.sleepData = sleepData; // Assign sleepData to the component property
    }
 
  },
}
</script>

<style scoped>
.card {
    padding: 20px;
    width: fit-content; 
    height: fit-content;
    margin: auto; 
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; padding: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    justify-content: center;
}


.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.statistic {
  margin: auto;
  font-size: 18px;
  color: #333;
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
</style>