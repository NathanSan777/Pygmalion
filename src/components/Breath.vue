<template>
  <div>
    <div class="card">
          <h1>Breathe</h1>
          <p>Please enter how many cycles you'd like to breathe for.</p>
          <div class="form-group">
            <input type="number" min="0" max="20" class="form-control" id="userInputForm" placeholder="Number of cycles" v-model="cycles"/>
          </div>
          <br>
          <button class="btn btn-primary" @click="startAnimation">Start</button>
    </div>
      <div class="circle-container">
      <div class="circle" :class="{ expanding: isExpanding, contracting: isContracting }"></div>
    </div>
  </div>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'

export default {
    data() {
      return {
        currentUser: null,
        userDataDoc: null,
        cycles: 0,
        isExpanding: false,
        isContracting: false
      }
    },
    methods: {
      async startAnimation() {
        for(let i = 0; i < this.cycles; i++){

          // Set the flag to start expanding animation
          this.isExpanding = true;
        
          // Expand for 4 seconds
          await this.sleep(4000);
        
          //Hold size for 7 seconds
          await this.sleep(7000);

          this.isExpanding = false;
          // Start contracting animation
          this.isContracting = true;
        
          // Contract for 8 seconds
          await this.sleep(8000);
        
          // Reset the flag to stop contracting
          this.isContracting = false;

        }
    },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    }
}
</script>

<style scoped>

h1{
  align-self: center;
  margin-bottom: 20px;
}
input{
  align-self: center;
  text-align: center;
}
.form-control {
    background:transparent;
    border: none;
    border-radius: 0;
    border-bottom: solid black; 
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
.card {
    width: fit-content; 
    height: fit-content;
    margin: auto; 
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; padding: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
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

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure the circle is on top of other elements */
  animation: rainbow 60s infinite; /* Apply the rainbow animation */
}

.circle-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: auto;
}

@keyframes rainbow {
  0% { background-color: red; }
  14% { background-color: orange; }
  28% { background-color: yellow; }
  42% { background-color: green; }
  56% { background-color: blue; }
  70% { background-color: indigo; }
  84% { background-color: violet; }
  100% { background-color: red; }
}
.circle.expanding {
  animation: expand 4s forwards,  rainbow 60s infinite; /* Start expanding animation */
}

.circle.contracting {
  animation: contract 8s forwards, rainbow 60s infinite; /* Start contracting animation */
}

@keyframes expand {
  /* 0% { transform: scale(1); } Start from original size */
  /* 100% { transform: scale(1.5); } Expand to 1.5 times the original size */
  0% { transform: translate(-50%, -50%) scale(1); } /* Start from original size and position */
  100% { transform: translate(-50%, -50%) scale(1.5); } /* Expand to 1.5 times the original size */
}

@keyframes contract {
  /* 0% { transform: scale(1.5); } /* Start from 1.5 times the original size */
  /* 100% { transform: scale(1); } Contract back to the original size */
  0% { transform: translate(-50%, -50%) scale(1.5); } /* Start from 1.5 times the original size and position */
  100% { transform: translate(-50%, -50%) scale(1); } /* Contract back to the original size */
}
</style>