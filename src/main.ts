import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "vuetify";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";

const vuetify = createVuetify({
    components,
    directives,
});

export default createVuetify({
    theme: {
        defaultTheme: "dark",
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: colors.grey.darken2,
                    secondary: colors.grey.lighten4,
                },
            },
        },
    },
});

createApp(App).use(vuetify).mount("#app");
