// "" = major / "m" = minor
type GeneralChordType = "normal" | "7" | "sus";
type ChordType = "" | "m" | "dim" | "7" | "m7" | "maj7" | "sus2" | "sus4";

type Chord = {
    root: string;
    type: ChordType[];
};

function convertGeneralChordTypeToChordType(generalChordTypes: GeneralChordType[]): ChordType[] {
    let chordTypes: ChordType[] = [];

    if (generalChordTypes.includes("normal")) {
        chordTypes.push("");
        chordTypes.push("m");
        chordTypes.push("dim");
    }
    if (generalChordTypes.includes("7")) {
        chordTypes.push("7");
        chordTypes.push("m7");
        chordTypes.push("maj7");
    }
    if (generalChordTypes.includes("sus")) {
        chordTypes.push("sus2");
        chordTypes.push("sus4");
    }

    return chordTypes;
}

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

function getStrings() {
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
                string.push(notes[noteCount].toUpperCase());
            }

            if (stringNames[stringId].toUpperCase() == notes[i]) {
                addNotes = true;
            }
        }
    }
    console.log(strings);
    return strings;
}

function randomNote(): string {
    let id = Math.trunc(Math.random() * notes.length);
    return notes[id];
}

function randomKey(): string {
    let id = Math.trunc(Math.random() * notes.length);
    let majorMinor = Math.random() > 0.5 ? "major" : "minor";
    return `${notes[id]} ${majorMinor}`;
}

function getNotesInMajorKey(key: string): string[] {
    const notesStartingOnKey = [];
    for (let i = 0; i < notes.length * 2; i++) {
        if (notesStartingOnKey.length >= 12) {
            break;
        }

        if (notesStartingOnKey.length == 0 && notes[i % notes.length] != key.toUpperCase()) {
            continue;
        }

        notesStartingOnKey.push(notes[i % notes.length]);
    }

    const notesOfKeyIndexes = [0, 2, 4, 5, 7, 9, 11];
    let notesOfKey = [];

    for (let i = 0; i < notesOfKeyIndexes.length; i++) {
        notesOfKey.push(notesStartingOnKey[notesOfKeyIndexes[i]]);
    }

    return notesOfKey;
}

function getChordsInMajorKey(key: string): Chord[] {
    const notesOfKey = getNotesInMajorKey(key);

    const chords: Chord[] = [];

    for (let i = 0; i < 7; i++) {
        let chord: Chord = {
            root: "",
            type: [],
        };

        chord.root = notesOfKey[i];

        switch (i + 1) {
            case 1:
            case 4:
                chord.type = ["", "maj7", "sus2", "sus4"];
                break;
            case 2:
            case 6:
                chord.type = ["m", "m7", "sus2", "sus4"];
                break;
            case 3:
                chord.type = ["m", "m7", "sus4"];
                break;
            case 5:
                chord.type = ["", "7", "sus2", "sus4"];
                break;
            case 7:
                chord.type = ["dim", "sus2", "sus4"];
                break;
        }

        chords.push(chord);
    }

    return chords;
}

function getRelativeMajorOfMinorKey(minorKey: string): string {
    const minorKeyId = notes.indexOf(minorKey.toUpperCase());

    return notes[(minorKeyId + 3) % notes.length];
}

function randomChordFromMajorKey(majorKey: string, possibleTypes: GeneralChordType[] = []): string {
    const chords: Chord[] = getChordsInMajorKey(majorKey);

    let randomChord: Chord = chords[Math.trunc(Math.random() * chords.length)];
    let randomChordType = randomChord.type[Math.trunc(Math.random() * randomChord.type.length)];

    if (possibleTypes.length > 0) {
        const possibleTypesAll = convertGeneralChordTypeToChordType(possibleTypes);

        while (true) {
            let typesIncluded = 0;
            randomChord.type.forEach((type) => {
                if (possibleTypesAll.includes(type)) {
                    typesIncluded++;
                }
            });

            if (typesIncluded > 0) {
                break;
            }

            randomChord = chords[Math.trunc(Math.random() * chords.length)];
        }

        while (!possibleTypesAll.includes(randomChordType as ChordType)) {
            randomChordType = randomChord.type[Math.trunc(Math.random() * randomChord.type.length)];
        }
    }

    let randomChordText = randomChord.root + randomChordType;
    return randomChordText;
}

export { type Chord, type ChordType, type GeneralChordType, convertGeneralChordTypeToChordType, getStrings, randomNote, randomKey, getNotesInMajorKey, getChordsInMajorKey, getRelativeMajorOfMinorKey, randomChordFromMajorKey };
