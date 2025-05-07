<script setup lang="ts">
import { ref } from "vue";

import Options from "./components/Options.vue";
import Guessing from "./components/Guessing.vue";

let showOptions = ref<boolean>(false);
let currentOptions = ref<[boolean, string[]]>([
    false,
    ["E", "A", "D", "G", "B", "e"],
]);

function hideOptions(options: [boolean, string[]]) {
    showOptions.value = false;
    currentOptions.value = options;
}
</script>

<template>
    <div id="mainContainer">
        <Guessing :options="currentOptions" @showOptions="showOptions = true" />
        <Options
            v-show="showOptions"
            @hideOptions="(options: [boolean, string[]]) => hideOptions(options)" />
    </div>
</template>

<style scoped>
#mainContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
