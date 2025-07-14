<script setup lang="ts">
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";
// import { ref, watch } from "vue";

let currentQuestion = "";

function changeQuestion(i: string) {
    currentQuestion = i;
}
</script>

<template>
    <Question @newQuestion="(i) => changeQuestion(i)" />
    <Answer />
</template>

<style scoped></style>
