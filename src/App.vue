<template>
  <video autoplay muted loop id="backgroundVideo">
    <!-- <source src="./assets/beach.mp4" type="video/mp4"> -->
    <source v-for="(source, index) in videoSources" :key="index" :src="source.src" :type="source.type">
  </video>

  <template v-if="!authStore.isLoggedIn">
    <!-- <RouterView/> -->
    <router-view></router-view>
  </template>

  <template v-else>
    <DashboardComponent></DashboardComponent>
  </template>

</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useStoreAuth } from './stores/storeAuth'
import { useForumStore } from './stores/forumStore';
import DashboardComponent from './components/DashboardComponent.vue';

export default {
  components:{
    DashboardComponent,
    RouterView,
    RouterLink
  }, 
  setup() {
    const authStore = useStoreAuth();
    const router = useRouter();

    const backgroundVideoSource = ref('/src/assets/beach.mp4');
    const videoSources = [
      {src: '/src/assets/beach.mp4', type: 'video/mp4'},
      {src: '/src/assets/forest.mp4', type: 'video/mp4'},
      {src: '/src/assets/snowy.mp4', type: 'video/mp4'},
      {src: '/src/assets/sunset.mp4', type: 'video/mp4'},
      {src: '/src/assets/mountains.mp4', type: 'video/mp4'},
      {src: '/src/assets/lake.mp4', type: 'video/mp4'}
    ];

    onMounted(async () => {
      if (!authStore.isLoggedIn){
        router.push('/auth')
      } else {
        // Fetch user's background variable from Firebase
        const userBackground = authStore.background;
        // Set the background video source based on the user's background
        if (userBackground === 'Forest') {
          backgroundVideoSource.value =  '/src/assets/forest.mp4';
        } 
        else if (userBackground === 'Snowy') {
          backgroundVideoSource.value = '/src/assets/snowy.mp4';
        }
        else if (userBackground === 'Sunset') {
          backgroundVideoSource.value = '/src/assets/sunset.mp4';
        }
        else if (userBackground === 'Mountains') {
          backgroundVideoSource.value = '/src/assets/mountains.mp4';
        }
        else {
          backgroundVideoSource.value = '/src/assets/lake.mp4';
        }
      }
    });
    return { router, authStore, backgroundVideoSource, videoSources };
  },
}

</script>

<style scoped>

#backgroundVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
} */

nav a:first-of-type {
  border: 0;
}

</style>
