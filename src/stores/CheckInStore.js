import { defineStore } from 'pinia';

export const useCheckInStore = defineStore('checkIn', {
  state: () => ({
    dayStatus: '',
    medsTaken: false,
    hoursOfSleep: 0,
    userPositiveThing: '',
    userImprovementThing: '',
  }),
  getters: {
    isCheckInComplete(state) {
      return (
        state.dayStatus !== '' &&
        state.userPositiveThing !== '' &&
        state.userImprovementThing !== ''
      );
    },
  },
  actions: {
    printSubmit() {
      console.log("User's day was: " + this.dayStatus);
      console.log("Did the user take their meds today? " + this.medsTaken);
      console.log(
        "User's amount of sleep: " + this.hoursOfSleep + ' hour(s)'
      );
      console.log('User\'s positive thing: ' + this.userPositiveThing);
      console.log(
        'User\'s thing to improve on: ' + this.userImprovementThing
      );
      this.clearFields();
      alert('Your submission has been recorded!');
    },
    clearFields() {
      this.dayStatus = '';
      this.medsTaken = false;
      this.hoursOfSleep = 0;
      this.userPositiveThing = '';
      this.userImprovementThing = '';
    }
  },
  getters: {
    isCheckInComplete(state) {
        return (
          state.dayStatus !== '' &&
          state.userPositiveThing !== '' &&
          state.userImprovementThing !== ''
        )
    }

  }
});
