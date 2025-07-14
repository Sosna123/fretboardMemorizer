<script setup lang="ts">
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

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
</script>

<template></template>

<style scoped></style>
