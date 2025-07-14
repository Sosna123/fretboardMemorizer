<script setup lang="ts">
import { ref } from "vue";
import { getStrings } from "../scripts/getStrings";
let strings = getStrings();
let stringNames = ["e", "B", "G", "D", "A", "E"];
let clickedNote = ref<string>("");

function displayNote(note: string) {
    clickedNote.value = note;
}
</script>

<template>
    <v-table id="fretboard">
        <tbody>
            <tr v-for="string in stringNames">
                <td @click="displayNote(string)">{{ string }}</td>
                <td
                    v-for="notes in strings[stringNames.indexOf(string)]"
                    @click="displayNote(notes)"></td>
            </tr>
        </tbody>
    </v-table>

    <div id="clickedNote">
        {{ clickedNote }}
    </div>
</template>

<style scoped>
#fretboard {
    background-image: url("../assets/fretboard.png");
}
td {
    border: 1px solid black;
}
</style>
