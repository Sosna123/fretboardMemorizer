<script setup lang="ts">
import { ref } from "vue";

let currRandomNote = ref<string>("");
let currRandomKey = ref<string>("");

function randomNote() {
    let notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    let id = Math.trunc(Math.random() * notes.length);
    currRandomNote.value = notes[id];
}

function randomKey() {
    let notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    let id = Math.trunc(Math.random() * notes.length);
    let majorMinor = Math.random() > 0.5 ? "major" : "minor";
    currRandomKey.value = `${notes[id]} ${majorMinor}`;
}

// start with everything random
randomNote();
randomKey();
</script>

<template>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Note: {{ currRandomNote }}</h1>
            <v-btn @click="randomNote()">New Note</v-btn>
        </div>
    </div>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Key: {{ currRandomKey }}</h1>
            <v-btn @click="randomKey()">New Key</v-btn>
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
</style>
