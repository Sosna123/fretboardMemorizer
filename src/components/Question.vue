<script setup lang="ts">
import { ref, defineEmits } from "vue";
const emit = defineEmits(["newQuestion"]);

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let currentQuestion = ref<string>("");

let stringNames = ["e", "B", "G", "D", "A", "E"];
let strings: string[][] = [[], [], [], [], [], []];
let addNotes = false;
for (let stringId = 0; stringId < strings.length; stringId++) {
    for (let i = 0; i <= notes.length * 2; i++) {
        let string = strings[stringId];
        let noteCount = i < notes.length ? i : i - notes.length;

        if (string.length >= 12) {
            addNotes = false;
        }

        if (addNotes) {
            string.push(notes[noteCount]);
        }

        if (stringNames[stringId].toUpperCase() == notes[i]) {
            addNotes = true;
        }
    }
}

function getNote() {
    let id = Math.trunc(Math.random() * notes.length);
    currentQuestion.value = notes[id];
    emit("newQuestion", currentQuestion.value);
}
</script>

<template>
    <h1>{{ currentQuestion }}</h1>
    <v-btn @click="getNote()">New Question</v-btn>
</template>

<style scoped></style>
