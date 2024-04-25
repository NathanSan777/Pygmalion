<template>
    <div class="card">
      <h1>Settings</h1>
      <!-- Flex container to hold profile picture and settings options -->
    <div class="d-flex">
      <!-- Profile Picture and Choose File column -->
      <div class="profile-column">
        <div class="form-group d-flex flex-column align-items-center">
          <!-- Wrap the color input inside a label -->
          <label for="profile-picture">Profile Color</label>

          <div class="profile-color-circle" :style="{ backgroundColor: selectedColor }"></div>
          <!-- Hidden file input -->
          <input type="color" id="profile-color" class="form-control-file" v-model="selectedColor" @input="handleColorInput" style="width: 100px; height: 40px; padding: 0; border: none; border-radius: 5px; cursor: pointer; margin-top: 5px;">
          <p>Change Color</p>
        </div>
      </div>

      <!-- Settings options column -->
      <div class="settings-column ml-4">
        <!-- Background options dropdown -->
        <div class="form-group position-relative">
          <label for="background-option">Background:</label>
          <div class="select-wrapper">
          <select class="form-control" v-model="selectedBackground">
              <option value="Beach">Beach</option>
              <option value="Forest">Forest</option>
              <option value="Snowy">Snowy</option>
              <option value="Sunset">Sunset</option>
              <option value="Mountains">Mountains</option>
              <option value="Lake">Lake</option>
          </select>
          <span class="material-symbols-outlined">{{ backgroundIcon }}</span>
        </div>
      </div>
      <br>
        <!-- <label for="username">Username</label>
        <input type="text" class="form-control"> -->
      </div>
    </div>
    <br>
    <button class="btn btn-primary" @click="updateSettings">Update Settings</button>
  </div>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'


export default {
    data() {
      return {
        selectedBackground: "Beach",
        selectedColor: '',
        userSettings: null
      }
    },
    created() {
        this.fetchSettings();
    },
    methods: {
      async updateSettings(){
        try {
          await useStoreAuth().updateUserSettings(this.selectedColor, this.selectedBackground);
          console.log("User settings successfully updated.")
        } catch (error){
          console.error("Error updating user settings: ", error);
        }
        
      },
      async fetchSettings(){
        try {
        const settings = await useStoreAuth().fetchUserSettings;
        console.log("User settings fetched successfully: ", settings)
        this.selectedColor = useStoreAuth().userProfileColor;
        console.log("Current profile color is", this.selectedColor);
        this.selectedBackground = useStoreAuth().background;
        console.log("Current background is", this.selectedBackground);
        } catch(error){
          console.error("Error fetching user settings: ", error);
        }
      }
      
    },
    computed: {
      backgroundIcon(){
        switch (this.selectedBackground) {
        case 'Beach':
          return 'beach_access';
        case 'Forest':
          return 'forest';
        case 'Snowy':
          return 'ac_unit';
        case 'Sunset':
          return 'wb_twilight';
        case 'Mountains':
          return 'landscape';
        case 'Lake':
          return 'sailing';
        default:
          return '';
      }
    }
  }
}
</script>

<style scoped>

h1{
  align-self: center;
  margin-bottom: 20px;
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
.profile-color-circle {
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  border: 2px solid black;
}

.color-picker-button {
  position: relative;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.selected-color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.color-picker-label {
  position: relative;
  cursor: pointer;
}


/* Style the profile picture container */
.profile-picture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Style for the profile and settings columns */
.profile-column {
  flex: 1; /* Take up 1/2 of the available space */
}

.selected-color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 10px;
}

.settings-column {
  flex: 1; /* Take up 1/2 of the available space */
  margin-left: 20px;
}
.input-box {
    justify-content: right;
    display: flex;
    font-family: "Montserrat";
}
.material-symbols-outlined{
    margin: auto;
}
.select-wrapper {
  position: relative;
}

.select-wrapper select {
  padding-right: 30px; /* Adjust the padding to leave space for the icon */
}
.select-wrapper span.material-symbols-outlined {
  position: absolute;
  top: 50%;
  right: 5px; /* Adjust the right position as needed */
  transform: translateY(-50%);
}

</style>