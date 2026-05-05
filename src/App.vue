<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
    <div id="websiteBg" class="bg-secondary">
        <Navbar />
        <router-view />
    </div>
</template>

<style scoped>
#websiteBg {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
}
</style>
