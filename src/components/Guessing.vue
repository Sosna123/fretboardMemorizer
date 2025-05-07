<script setup lang="ts">
import { guessingWithoutSharp, guessingWithSharp } from "../objects.ts";
import { ref } from "vue";

const props = defineProps(["options"]);

let usersGuess = ref<string>("");
let currentQuestion = ref<string>("");

function newQuestion() {
    let soundArr = props.options[0] ? guessingWithSharp : guessingWithoutSharp;
    let stringsArr = props.options[1];
    const soundIndex = Math.trunc(Math.random() * soundArr.length);
    const stringIndex = Math.trunc(Math.random() * stringsArr.length);

    currentQuestion.value = `${soundArr[soundIndex]} on string ${stringsArr[stringIndex]}`;
}
</script>

<template>
    <div id="guessingContainer">
        <v-text-field
            hide-details="auto"
            label="Main input"
            v-model="usersGuess"></v-text-field>
        <v-btn @click="newQuestion()">new question</v-btn>
        <v-btn @click="$emit('showOptions')">show options</v-btn>
        <h1>{{ currentQuestion }}</h1>
    </div>
</template>

<style scoped>
#guessingContainer {
    z-index: 1;
    width: 90%;
    height: 90%;
}
</style>
