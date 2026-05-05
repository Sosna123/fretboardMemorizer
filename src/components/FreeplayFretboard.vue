<script setup lang="ts">
import { ref } from "vue";
import Fretboard from "./Fretboard.vue";

let clickedNotes = ref<string[]>([]);

function checkAnswer(i: { answer: string; string: string }) {
    let answer = i.answer;
    let string = i.string;
    let stringValue = `${answer}.${string}.c`;

    if (clickedNotes.value.includes(stringValue)) {
        clickedNotes.value = clickedNotes.value.filter((note) => note !== stringValue);
    } else {
        clickedNotes.value.push(`${answer}.${string}.c`);
    }
}
</script>

<template>
    <Fretboard :clickedNotes="clickedNotes" :freeplay="true" @sentAnswer="(i) => checkAnswer(i)" />
</template>

<style scoped></style>
