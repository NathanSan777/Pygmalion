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
                    <button class="sidebar-button check-in">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px; font-size: 45px;">check_circle</span>
                        <li>Check-In</li>
                    </button>
                </div>
            </div>
            <br>
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button journal">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px; font-size: 45px;">book</span>
                        <li>Journal</li>
                    </button>
                </div>
            </div>
            <br>
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button statistics">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px; font-size: 45px;">bar_chart</span>
                        <li>Statistics</li>
                    </button>
                </div>
            </div>
            <br>
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button breathe">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px;font-size: 45px; ">airwave</span>
                        <li>Breathe</li>
                    </button>
                </div>
            </div>
            <br>
            <div class="button-format">
                <div class="button-styling">
                    <button class="sidebar-button forum">
                        <span class="material-symbols-outlined" id="icon" style="margin-right:2px;font-size: 45px; ">forum</span>
                        <li>Forum</li>
                    </button>
                </div>
            </div>
            <br>
        </ul>
    </div>
</div>
</template> 

<script>

export default {
    data() {
        return {
            name: 'Sidebar',
            isCollapsed: true,
            selectedButton: 'CheckIn'
        };
    },
    methods: {
        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
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
    box-shadow: 0 0 30px rgba(182, 208, 226, 0.2);
}
.sidebar-button:hover{
    color: white;
    transition: 1s;
}
.sidebar-button.check-in:hover{
    background-color: lightpink; 
    backdrop-filter: blur(30px); 
}
.sidebar-button.journal:hover{
    background-color:royalblue;
    backdrop-filter: blur(30px); 
}
.sidebar-button.statistics:hover{
    background-color:forestgreen;
    backdrop-filter: blur(30px); 
}
.sidebar-button.breathe:hover{
    background-color:purple;
    backdrop-filter: blur(30px); 
}
.sidebar-button.forum:hover{
    background-color:goldenrod;
    backdrop-filter: blur(30px); 
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
/* New styling for the toggler bars */
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
