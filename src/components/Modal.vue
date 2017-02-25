<template>
    <div class="vue-bs-modal" >
        <transition name="slide">
            <div :class="classList"
                 tabindex="-1"
                 role="dialog"
                 style="display: block"
                 v-show="show"
                 @click="backdropClose"
            >
                <div :class="['modal-dialog', size]" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button"
                                    class="close"
                                    aria-label="Close"
                                    @click="$emit('close')"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>

                            <h4 class="modal-title" v-html="title"></h4>
                        </div>

                        <div class="modal-body">
                            <slot></slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div class="modal-backdrop" v-show="show"></div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            show: { default: false },

            title: { type: String },

            backdropCanClose: { default: true },

            size: { type: String, default: '' }
        },

        data() {
            return {

            };
        },

        computed: {
            classList() {
                return {
                    'modal': true
                };
            },

            backdropCanCloseState() {
                if (this.backdropCanClose === 'true') {
                    return true;
                }

                if (this.backdropCanClose === 'false') {
                    return false;
                }

                return this.backdropCanClose;
            }
        },

        methods: {
            backdropClose(event) {
                if (this.backdropCanCloseState && event.target.classList.contains('modal')) {
                    this.$emit('close');
                }
            }
        },

        watch: {
            show(value) {
                if (value === true) {
                    document.body.classList.add('modal-open');
                } else {
                    document.body.classList.remove('modal-open');
                }
            }
        }
    };
</script>

<style scope>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all .3s ease;
    }

    .slide-enter, .slide-leave-to {
        transform: translate(0, -25%);
        opacity: 0;
    }

    .modal-backdrop {
        background: rgba(0, 0, 0, .5);
    }
</style>
