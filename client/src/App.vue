<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  
  <div class="wrapper">
    <RouterView />
    <!-- <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      
    </header> -->
  </div>

</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: start;
    width: 100%;
    height: 130%;
    border: 2px solid red;
  }
</style>
