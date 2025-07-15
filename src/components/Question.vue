<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["newQuestion"]);
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let currentQuestion = ref<string>("");

function getNote() {
    let id = Math.trunc(Math.random() * notes.length);
    currentQuestion.value = notes[id];
    emit("newQuestion", currentQuestion.value);
}

getNote();
</script>

<template>
    <div id="questionDiv" class="bg-secondary">
        <div id="questionContent">
            <h1>Current Note: {{ currentQuestion ? currentQuestion : "?" }}</h1>
            <v-btn @click="getNote()">New Question</v-btn>
        </div>
    </div>
</template>

<style scoped>
#questionDiv {
    height: 200px;
    display: flex;
    background-color: gray;
    justify-content: center;
    align-items: center;
}

#questionContent {
    text-align: center;
}
</style>
