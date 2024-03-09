<template>
    <div class="sidebar" :class="{ 'collapsed': !isCollapsed}">
        <div class=" w-100 align-items-center">
            <button class="navbar-burger navbar-toggler" type="button" @click="toggleSidebar" :aria-expanded="!isCollapsed" style="justify-content: center;">
                <span class="icon-bar" :class="{ 'collapsed': !isCollapsed }"></span>
                <span class="icon-bar" :class="{ 'collapsed': !isCollapsed }"></span>
                <span class="icon-bar" :class="{ 'collapsed': !isCollapsed }"></span>
            </button>
        </div>
    <div v-if="!isCollapsed" class="sidebar-content" style="justify-content: left; padding-left: 0%;" >
        <br>
        <br>
        <!-- Sidebar content goes here -->
        <h1>MENU</h1>
        <ul style="display: flex; flex-direction: column; justify-content: center; padding-left: 0;"  >
            <div class="button-format">
                <div class="button-styling" >
                    <button class="sidebar-button check-in" @click="handleButtonClick('checkIn')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px; font-size: 30px;">check_circle</span>
                        <li>Check-In</li>
                    </button>
                </div>
            </div>
            
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button journal" @click="handleButtonClick('journal')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px; font-size: 30px;">book</span>
                        <li>Journal</li>
                    </button>
                </div>
            </div>
            
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button statistics" @click="handleButtonClick('statistics')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px; font-size: 30px;">bar_chart</span>
                        <li>Statistics</li>
                    </button>
                </div>
            </div>
            
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button breathe" @click="handleButtonClick('breathe')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px;font-size: 30px; ">airwave</span>
                        <li>Breathe</li>
                    </button>
                </div>
            </div>
            
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button forum" @click="handleButtonClick('forum')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px;font-size: 30px; ">forum</span>
                        <li>Forum</li>
                    </button>
                </div>
            </div>
            
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button settings" @click="handleButtonClick('userSettings')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px;font-size: 30px; ">settings</span>
                        <li>Settings</li>
                    </button>
                </div>
            </div>
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button logout" @click="handleButtonClick('logout')">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px;font-size: 30px; ">logout</span>
                        <li>Log Out</li>
                    </button>
                </div>
            </div>
        </ul>
    </div>
</div>
</template> 

<script>
import { useNavigationStore } from '../stores/navigationStore'
import { useStoreAuth } from '../stores/storeAuth';


export default {
    data() {
        return {
            name: 'Sidebar',
            isCollapsed: true,
            selectedButton: 'checkIn'
        };
    },
    methods: {
        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },
        handleButtonClick(location){
            const navigationStore = useNavigationStore();
            navigationStore.setCurrentLocation(location);
        }
    },
}
</script>

<style scoped>
*{
    box-sizing: border-box;
}

.sidebar {
    width: 180px; 
    height:100%;
    margin: auto; 
    top: 0;
    left:0;
    position: fixed;
    background-color: none; 
    z-index: 1000;
}

.sidebar-content{
    width: 180px; 
    height:100%;
    margin: auto; 
    /* position: absolute;  */
    justify-content: left;
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; 
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.button-format {
    justify-content: left;
    display: flex;
    flex-direction: row;
    font-family: "Montserrat";
}
.sidebar-button{
    display: flex;
    width: 180px;
    flex-direction: row;
    background-color: transparent;
    border:none;
    font-family: "Montserrat";
    font-weight: bold; 
    text-align: center; 
    display: block;  
    margin: auto;
    margin-bottom: 20px;
    box-shadow: 0 0 30px rgba(182, 208, 226, 0.2);
}
.sidebar-button:hover{
    color: white;
    transition: 1s;
}
.sidebar-button.check-in:hover{
    background-color: lightpink; 
}
.sidebar-button.journal:hover{
    background-color:royalblue;
}
.sidebar-button.statistics:hover{
    background-color:forestgreen; 
}
.sidebar-button.breathe:hover{
    background-color:purple;
}
.sidebar-button.forum:hover{
    background-color:goldenrod;
}
.sidebar-button.settings:hover{
    background-color:grey; 
}
.sidebar-button.logout:hover{
    background-color:orange; 
}
.sidebar-button:active,
.sidebar-button.selected {
  background-color: blue;
}
.navbar-toggler {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1001;
  width: 50px; /* Set the width of the button */
  height: 50px; /* Set the height of the button */
  background: hsla(0, 0%, 100%, 0.45); 
  backdrop-filter: blur(30px); 
  border: none; padding: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  cursor: pointer; /* Change cursor to pointer */
}

.btn, .btn-primary{
    background-color: transparent;
    border-color: black;
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
.icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  background-color: black;
  transition: transform 0.3s ease-in-out;
  margin: 5px auto;
}
.icon-bar.collapsed:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.icon-bar.collapsed:nth-child(2) {
  opacity: 0;
}
.icon-bar.collapsed:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

h1{
    color: black;
    font-weight: 880;
    text-align: right;
    padding: 10px 0;
    padding-right: 30px;
    justify-content: center;
    pointer-events:none;
}
ul li {
    list-style:none;
}
span #icon{
    position: right;
}
</style>
