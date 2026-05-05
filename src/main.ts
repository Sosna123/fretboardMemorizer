import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Vuetify
import "vuetify/styles/main.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "blue-grey",
        themes: {
            "blue-grey": {
                dark: true,
                colors: {
                    primary: colors.blueGrey.darken3,
                    secondary: colors.blueGrey.darken2,
                    tertiary: colors.blueGrey.darken1,
                    background: colors.blueGrey.darken4,
                },
            },
        },
    },
});

import { createWebHistory, createRouter } from "vue-router";
import FretboardNotes from "./components/FretboardNotes/FretboardNotes.vue";
import FreeplayFretboard from "./components/FreeplayFretboard.vue";
import RandomGenerators from "./components/RandomGenerators.vue";

const routes = [
    { path: "/", name: "fretboard", component: FreeplayFretboard },
    { path: "/memorizingFretboard", name: "fretboardMemorizing", component: FretboardNotes },
    { path: "/random", name: "randomGenerators", component: RandomGenerators },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(vuetify).use(router).mount("#app");
