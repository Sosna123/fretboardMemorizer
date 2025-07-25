<script setup lang="ts">
import { ref } from "vue";
import { getStrings } from "../scripts/getStrings";
const emit = defineEmits(["sentAnswer"]);
const props = defineProps({
    blockedStrings: {
        type: Array as () => string[],
        default: () => [],
    },
    clickedNotes: {
        type: Array as () => string[],
        default: () => [],
    },
});

let strings = getStrings();
let stringNames = ["e", "B", "G", "D", "A", "E"];
let fretboardNumbers = [
    0,
    ,
    ,
    3,
    ,
    5,
    ,
    7,
    ,
    9,
    ,
    ,
    12,
]; /* would be cool but it shifts the image */
let clickedNote = ref<string>("");

function displayNote(note: string) {
    let noteArr = note.split(".");
    let answerObj = {
        answer: noteArr[0],
        string: noteArr[1],
    };
    if (!props.blockedStrings.includes(answerObj.string)) {
        clickedNote.value = `${answerObj.answer} on ${answerObj.string} string`;
        emit("sentAnswer", answerObj);
    }
}
</script>

<template>
    <div id="answerDiv" class="bg-tertiary">
        <div id="clickedNote">
            {{ clickedNote }}
        </div>
        <v-table id="fretboard" class="bg-primary">
            <tbody>
                <tr
                    v-for="string in stringNames"
                    :class="{ blocked: props.blockedStrings.includes(string) }">
                    <td
                        @click="displayNote(`${string}.${string}`)"
                        :class="{
                            correct: props.clickedNotes.includes(
                                `${string}.${string}.c`
                            ),
                            incorrect: props.clickedNotes.includes(
                                `${string}.${string}.n`
                            ),
                        }">
                        {{ string }}
                    </td>
                    <td
                        v-for="notes in strings[stringNames.indexOf(string)]"
                        @click="displayNote(`${notes}.${string}`)"
                        :id="`${notes}.${string}`"
                        :class="{
                            correct: props.clickedNotes.includes(
                                `${notes}.${string}.c`
                            ),
                            incorrect: props.clickedNotes.includes(
                                `${notes}.${string}.n`
                            ),
                        }"></td>
                </tr>
                <tr>
                    <td
                        v-for="number in fretboardNumbers"
                        id="fretboardNumbers">
                        {{ number }}
                    </td>
                </tr>
                <!-- would be cool but it shifts the image -->
            </tbody>
        </v-table>
    </div>
</template>

<style scoped>
#answerDiv {
    height: 50vh;
    overflow: scroll;
}

#clickedNote {
    min-height: 50px;
    max-height: 50px;
    text-align: center;
    font-size: 32px;
}

#fretboard {
    background-image: url("../assets/fretboard.png");
    min-width: 1920px;
    max-width: 1920px;
    min-height: 364px;
    max-height: 364px;
}

td {
    width: calc(1920px / 13);
    border: none !important;
    /* border: 1px solid black; */
}

#fretboardNumbers {
    text-align: center;
}

td.correct {
    background-color: rgba(0, 255, 0, 0.25);
}
td.incorrect {
    background-color: rgba(255, 0, 0, 0.25);
}
tr.blocked {
    background-color: rgba(150, 150, 150, 0.25);
}
</style>
