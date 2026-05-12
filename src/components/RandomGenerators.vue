<script setup lang="ts">
import { ref } from "vue";
import { type GeneralChordType, randomNote, randomKey, getRelativeMajorOfMinorKey, getNotesInMajorKey, randomChordFromMajorKey } from "../scripts/noteScripts";

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const keyTypes = ["major", "minor"];

let currRandomNote = ref<string>("");
let currRandomKey = ref<string>("");

let currRandomNoteOfKey = ref<string>("");
let currDataRandomNoteOfKey = ref<[string, string]>(["C", "major"]);

let currDataRandomChordOfKey = ref<[string, string]>(["C", "major"]);
let possibleChordTypes = ref<GeneralChordType[]>(["normal", "7", "sus"]);
let currChordOfKey = ref<string>("");

function randomNoteFromKey(oldNote: string | null): string {
    let key = currDataRandomChordOfKey.value[0];
    if (currDataRandomChordOfKey.value[1] == "minor") {
        key = getRelativeMajorOfMinorKey(currDataRandomChordOfKey.value[0]);
    }

    const allNotes = getNotesInMajorKey(key);
    let note = allNotes[Math.floor(Math.random() * allNotes.length)];

    while (oldNote == note) {
        note = allNotes[Math.floor(Math.random() * allNotes.length)];
    }

    return note;
}

function randomChordFromKey(oldChord: string | null): string {
    let key = currDataRandomChordOfKey.value[0];
    if (currDataRandomChordOfKey.value[1] == "minor") {
        key = getRelativeMajorOfMinorKey(currDataRandomChordOfKey.value[0]);
    }

    let currChord = randomChordFromMajorKey(key, possibleChordTypes.value);

    while (currChord == oldChord) {
        currChord = randomChordFromMajorKey(key, possibleChordTypes.value);
    }

    return currChord;
}

// start with everything random
currRandomNote.value = randomNote();
currRandomKey.value = randomKey();
currRandomNoteOfKey.value = randomNoteFromKey(null);
currChordOfKey.value = randomChordFromKey(null);
</script>

<template>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Note: {{ currRandomNote }}</h1>
            <v-btn @click="currRandomNote = randomNote()">New Note</v-btn>
        </div>
    </div>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Key: {{ currRandomKey }}</h1>
            <v-btn @click="currRandomKey = randomKey()">New Key</v-btn>
        </div>
    </div>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Note in Key: {{ currRandomNoteOfKey }}</h1>
            <div id="keySelects">
                <v-select :items="notes" v-model="currDataRandomNoteOfKey[0]"></v-select>
                <v-select :items="keyTypes" v-model="currDataRandomNoteOfKey[1]"></v-select>
            </div>
            <v-btn @click="currRandomNoteOfKey = randomNoteFromKey(currRandomNoteOfKey)">New Chord</v-btn>
        </div>
    </div>
    <div class="questionDiv bg-secondary">
        <div class="questionContent">
            <h1>Random Chord in Key: {{ currChordOfKey }}</h1>
            <div id="keySelects">
                <v-select :items="notes" v-model="currDataRandomChordOfKey[0]"></v-select>
                <v-select :items="keyTypes" v-model="currDataRandomChordOfKey[1]"></v-select>
            </div>
            <v-select multiple chips title="Chord Types" :items="['normal', '7', 'sus']" v-model="possibleChordTypes"></v-select>
            <v-btn @click="currChordOfKey = randomChordFromKey(currChordOfKey)">New Chord</v-btn>
        </div>
    </div>
</template>

<style scoped></style>
