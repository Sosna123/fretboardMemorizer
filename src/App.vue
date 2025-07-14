<script setup lang="ts">
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";
// import { ref, watch } from "vue";

let currentQuestion = "";
let blockedStrings: string[] = [];

function changeQuestion(i: string) {
    currentQuestion = i;
}

function checkAnswer(i: { answer: string; string: string }) {
    let answer = i.answer;
    let string = i.string;
    if (!blockedStrings.includes(string)) {
        if (answer === currentQuestion) {
            console.log("cool");
            blockedStrings.push(string);
        } else {
            console.log("uncool");
        }
    }
}
</script>

<template>
    <Question @newQuestion="(i) => changeQuestion(i)" />
    <Answer
        :blockedStrings="blockedStrings"
        @sentAnswer="(i) => checkAnswer(i)" />
</template>

<style scoped></style>
