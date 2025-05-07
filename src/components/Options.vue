<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["hideOptions"]);

let withSharps = ref<boolean>(false);
let possibleStrings = ref<string[]>(["E", "A", "D", "G", "B", "e"]);

function saveOptions() {
    if (possibleStrings.value.length <= 0) {
        return;
    }

    emit("hideOptions", [withSharps.value, possibleStrings.value]);
}
</script>

<template>
    <div id="optionsBackground">
        <div id="optionsContainer">
            <v-btn @click="saveOptions()">hide and save</v-btn>
            <br />

            <v-select
                v-model="possibleStrings"
                :items="['E', 'A', 'D', 'G', 'B', 'e']"
                label="Select"
                multiple></v-select>

            <br />
            <v-btn @click="withSharps = !withSharps">{{
                withSharps ? "all sounds" : "without sharps"
            }}</v-btn>
        </div>
    </div>
</template>

<style scoped>
#optionsBackground {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;
}

#optionsContainer {
    width: 50%;
    height: 50%;
    background-color: darkslategray;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 6;
    border-radius: 50px;
}
</style>
