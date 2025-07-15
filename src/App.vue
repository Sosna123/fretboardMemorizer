<script setup lang="ts">
import { ref } from "vue";
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";
// import { ref, watch } from "vue";

let currentQuestion = "";
let blockedStrings = ref<string[]>([]);
let clickedNotes = ref<string[]>([]);

function changeQuestion(i: string) {
    currentQuestion = i;
    blockedStrings.value = [];
    clickedNotes.value = [];
}

function checkAnswer(i: { answer: string; string: string }) {
    let answer = i.answer;
    let string = i.string;
    if (!blockedStrings.value.includes(string)) {
        if (answer === currentQuestion) {
            console.log("cool");
            blockedStrings.value.push(string);
            clickedNotes.value.push(`${answer}.${string}.c`);
        } else {
            console.log("uncool");
            clickedNotes.value.push(`${answer}.${string}.n`);
        }
    }
}
</script>

<template>
    <Question @newQuestion="(i) => changeQuestion(i)" />
    <Answer
        :blockedStrings="blockedStrings"
        :clickedNotes="clickedNotes"
        @sentAnswer="(i) => checkAnswer(i)" />
</template>

<style scoped></style>
