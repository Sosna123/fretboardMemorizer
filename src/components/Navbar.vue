<script setup lang="ts">
type Route = {
    name: string;
    path: string;
};

const possibleRoutes: Route[] = [
    {
        name: "Fretboard Marking",
        path: "/",
    },
    {
        name: "Memorizing notes of the Fretboard",
        path: "/memorizingFretboard",
    },
    {
        name: "Random Note / Key",
        path: "/random",
    },
];
</script>

<template>
    <div id="navbar" class="bg-primary">
        <router-link v-for="route in possibleRoutes" :to="route.path">{{ route.name }}</router-link>
    </div>
</template>

<style scoped>
#navbar {
    height: 10vh;
    padding: 20px;
}

#navbar > a {
    color: white;
    text-decoration: none;
    font-size: 150%;
    margin-right: 30px;
}
</style>
