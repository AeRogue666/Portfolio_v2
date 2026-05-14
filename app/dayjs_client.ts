import "dayjs/locale/fr";
import "dayjs/locale/en";
import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {
    dayjs.locale("fr");

    return {
        provide : {
            dayjs
        }
    };
});
