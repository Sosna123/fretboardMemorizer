<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { getStrings } from "../scripts/getStrings";
const emit = defineEmits(["newQuestion"]);
let strings = getStrings();
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let currentQuestion = ref<string>("");

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
