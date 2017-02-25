import Vue from "vue";
import Modal from "./components/Modal"

new Vue({
    el: "#app",

    data: {
        modalActive: false
    },

    components: { Modal }
});
