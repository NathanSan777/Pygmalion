<template>
  <video autoplay muted loop id="backgroundVideo">
    <source src="./assets/beach.mp4" type="video/mp4">
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
import { onMounted } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useStoreAuth } from './stores/storeAuth'
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
    onMounted(() => {
      router.push('/auth')
    })
    return { router, authStore };
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
