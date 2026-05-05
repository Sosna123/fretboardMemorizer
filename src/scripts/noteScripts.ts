// "" = major / "m" = minor
type ChordType = "" | "m" | "dim" | "7" | "m7" | "maj7" | "sus2" | "sus4";

type Chord = {
    root: string;
    type: ChordType[] | null;
};

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
                string.push(notes[noteCount]);
            }

            if (stringNames[stringId].toUpperCase() == notes[i]) {
                addNotes = true;
            }
        }
    }
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

function getChordsInMajorKey(key: string): Chord[] {
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

    const notesOfKey = [0, 2, 4, 5, 7, 9, 11];

    const chords: Chord[] = [];

    for (let i = 0; i < 7; i++) {
        let chord: Chord = {
            root: "",
            type: null,
        };

        chord.root = notesStartingOnKey[notesOfKey[i] % notesStartingOnKey.length];

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

function randomChordFromMajorKey(majorKey: string): string {
    const chords: Chord[] = getChordsInMajorKey(majorKey);

    let randomChord: Chord = chords[Math.trunc(Math.random() * chords.length)];
    let randomChordType: string = randomChord.type![Math.trunc(Math.random() * randomChord.type!.length)];

    let randomChordText = randomChord.root + randomChordType;
    return randomChordText;
}

export { type Chord, getStrings, randomNote, randomKey, getChordsInMajorKey, getRelativeMajorOfMinorKey, randomChordFromMajorKey };
