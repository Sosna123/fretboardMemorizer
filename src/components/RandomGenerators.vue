<script setup lang="ts">
import { ref } from "vue";
import { randomNote, randomKey, getRelativeMajorOfMinorKey, randomChordFromMajorKey } from "../scripts/noteScripts";

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const keyTypes = ["major", "minor"];

let currRandomNote = ref<string>("");
let currRandomKey = ref<string>("");
let currKeyRoot = ref<string>("C");
let currKeyType = ref<string>("major");
let currChordOfKey = ref<string>("");

function randomChordFromKey() {
    let key = currKeyRoot.value;
    if (currKeyType.value == "minor") {
        key = getRelativeMajorOfMinorKey(currKeyRoot.value);
    }

    return randomChordFromMajorKey(key);
}

// start with everything random
currRandomNote.value = randomNote();
currRandomKey.value = randomKey();
currChordOfKey.value = randomChordFromKey();
</script>

<template>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Note: {{ currRandomNote }}</h1>
            <v-btn @click="currRandomNote = randomNote()">New Note</v-btn>
        </div>
    </div>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Key: {{ currRandomKey }}</h1>
            <v-btn @click="currRandomKey = randomKey()">New Key</v-btn>
        </div>
    </div>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Chord in Key: {{ currChordOfKey }}</h1>
            <div id="keySelects">
                <v-select :items="notes" v-model="currKeyRoot"></v-select>
                <v-select :items="keyTypes" v-model="currKeyType"></v-select>
            </div>
            <v-btn @click="currChordOfKey = randomChordFromKey()">New Chord</v-btn>
        </div>
    </div>
</template>

<style scoped>
.questionDiv {
    height: 200px;
    display: flex;
    background-color: gray;
    justify-content: center;
    align-items: center;
}

.questionContent {
    text-align: center;
}

#keySelects {
    display: flex;
    justify-content: center;
}
</style>
