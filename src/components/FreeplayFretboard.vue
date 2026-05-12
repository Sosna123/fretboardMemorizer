<script setup lang="ts">
import { ref } from "vue";
import Fretboard from "./Fretboard.vue";
import { getRelativeMajorOfMinorKey, getNotesInMajorKey } from "../scripts/noteScripts";

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const strings = ["e", "B", "G", "D", "A", "E"];
const keyTypes = ["major", "minor"];

let clickedNotes = ref<string[]>([]);
let selectedNote = ref<string>("C");
let currKeyChosen = ref<[string, string]>(["C", "major"]);

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

function markANote(note: string) {
    strings.forEach((string) => {
        let stringValue = `${note}.${string}.c`;
        if (!clickedNotes.value.includes(stringValue)) {
            clickedNotes.value.push(stringValue);
        } else {
            clickedNotes.value = clickedNotes.value.filter((note) => note !== stringValue);
        }
    });
}

function displayNotesOfKey() {
    let key = currKeyChosen.value[0];
    if (currKeyChosen.value[1] == "minor") {
        key = getRelativeMajorOfMinorKey(currKeyChosen.value[0]);
    }

    const allNotes = getNotesInMajorKey(key);
    allNotes.forEach((note) => {
        strings.forEach((string) => {
            let stringValue = `${note}.${string}.c`;

            if (!clickedNotes.value.includes(stringValue)) {
                clickedNotes.value.push(stringValue);
            }
        });
    });
}
</script>

<template>
    <Fretboard :clickedNotes="clickedNotes" :freeplay="true" @sentAnswer="(i) => checkAnswer(i)" />

    <div>
        <div class="questionDiv bg-secondary">
            <div class="questionContent">
                <h1>Clear the fretboard</h1>
                <v-btn @click="clickedNotes = []">Clear</v-btn>
            </div>
        </div>

        <div class="questionDiv bg-secondary">
            <div class="questionContent">
                <h1>Automatically mark / unmark a note:</h1>
                <v-select :items="notes" v-model="selectedNote"></v-select>
                <v-btn @click="markANote(selectedNote)">Submit</v-btn>
            </div>
        </div>

        <div class="questionDiv bg-secondary">
            <div class="questionContent">
                <h1>Automatically mark all notes of a key:</h1>
                <div id="keySelects">
                    <v-select :items="notes" v-model="currKeyChosen[0]"></v-select>
                    <v-select :items="keyTypes" v-model="currKeyChosen[1]"></v-select>
                </div>
                <v-btn @click="displayNotesOfKey()">Submit</v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
