<template>
    <transition appear :name="transitionName">
        <div class="cookie" :class="['cookie__' + type, 'cookie__' + type + '--' + position]" v-if="isOpen" :id="elementId">

            <div v-if="showPostponeButton === true" @click="postpone" :class="'cookie__' + type + '__postpone-button'" title="Close">
                <slot name="postponeContent">
                    &times;
                </slot>
            </div>

            <div :class="'cookie__' + type + '__content'">
                <slot name="message">
                    We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a>
                </slot>
            </div>

            <div :class="'cookie__' + type + '__buttons'">
                <button v-if="disableDecline === false" @click="decline" :class="['cookie__' + type + '__buttons__button', 'cookie__' + type + '__buttons__button--decline']">
                    <slot name="declineContent">
                        Opt Out
                    </slot>
                </button>
                <button @click="accept" :class="['cookie__' + type + '__buttons__button', 'cookie__' + type + '__buttons__button--accept']">
                    <slot name="acceptContent">
                        Got It!
                    </slot>
                </button>
            </div>

        </div>
    </transition>
</template>

<script>
import * as tinyCookie from 'tiny-cookie'

export default {
    name: 'vue-cookie-accept-decline',
    props: {
        elementId: {
            type: String,
            required: true
        },

        debug: {
            type: Boolean,
            default: false
        },

        disableDecline: {
            type: Boolean,
            default: false
        },

        // floating: bottom-left, bottom-right, top-left, top-rigt
        // bar:  bottom, top
        position: {
            type: String,
            default: 'bottom-left'
        },

        // floating, bar
        type: {
            type: String,
            default: 'floating'
        },

        // slideFromBottom, slideFromTop, fade
        transitionName: {
            type: String,
            default: 'slideFromBottom'
        },

        showPostponeButton: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            status: null,
            supportsLocalStorage: true,
            isOpen: false
        }
    },
    computed: {
        containerPosition () {
            return `cookie--${this.position}`
        },
        containerType () {
            return `cookie--${this.type}`
        }
    },
    mounted () {
        this.checkLocalStorageFunctionality()
        this.init()
    },
    methods: {
        init () {
            let visitedType = this.getCookieStatus()
            if (visitedType && (visitedType === 'accept' || visitedType === 'decline' || visitedType === 'postpone')) {
                this.isOpen = false
            }

            if (!visitedType) {
                this.isOpen = true
            }

            this.status = visitedType
            this.$emit('status', visitedType)
        },
        checkLocalStorageFunctionality () {
            // Check for availability of localStorage
            try {
                const test = '__vue-cookie-accept-decline-check-localStorage'
                window.localStorage.setItem(test, test)
                window.localStorage.removeItem(test)
            } catch (e) {
                console.error('Local storage is not supported, falling back to cookie use')
                this.supportsLocalStorage = false
            }
        },
        setCookieStatus (type) {
            if (this.supportsLocalStorage) {
                if (type === 'accept') {
                    localStorage.setItem(`vue-cookie-accept-decline-${this.elementId}`, 'accept')
                }
                if (type === 'decline') {
                    localStorage.setItem(`vue-cookie-accept-decline-${this.elementId}`, 'decline')
                }
                if (type === 'postpone') {
                    localStorage.setItem(`vue-cookie-accept-decline-${this.elementId}`, 'postpone')
                }
            } else {
                if (type === 'accept') {
                    tinyCookie.set(`vue-cookie-accept-decline-${this.elementId}`, 'accept')
                }
                if (type === 'decline') {
                    tinyCookie.set(`vue-cookie-accept-decline-${this.elementId}`, 'decline')
                }
                if (type === 'postpone') {
                    tinyCookie.set(`vue-cookie-accept-decline-${this.elementId}`, 'postpone')
                }
            }
        },
        getCookieStatus () {
            if (this.supportsLocalStorage) {
                return localStorage.getItem(`vue-cookie-accept-decline-${this.elementId}`)
            } else {
                return tinyCookie.get(`vue-cookie-accept-decline-${this.elementId}`)
            }
        },
        accept () {
            if (!this.debug) {
                this.setCookieStatus('accept')
            }

            this.status = 'accept'
            this.isOpen = false
            this.$emit('clicked-accept')
        },
        decline () {
            if (!this.debug) {
                this.setCookieStatus('decline')
            }

            this.status = 'decline'
            this.isOpen = false
            this.$emit('clicked-decline')
        },
        postpone () {
            if (!this.debug) {
                this.setCookieStatus('postpone')
            }

            this.status = 'postpone'
            this.isOpen = false
            this.$emit('clicked-postpone')
        },
        removeCookie () {
            localStorage.removeItem(`vue-cookie-accept-decline-${this.elementId}`)
            this.status = null
            this.$emit('removed-cookie')
        }
    },
}
</script>

<style lang="scss" scoped>
    $lighter-grey: #eee;
    $light-grey: #ddd;
    $grey: darken($light-grey, 9%);
    $green: #4caf50;
    $dark-green: darken($green, 8%);
    $red: #f44336;
    $dark-red: darken($red, 8%);
    $white: #fff;
    $off-white: darken($white, 2%);
    $black: #333;
    $transition: all 0.2s ease;

    .cookie {
        // Bar
        &__bar {
            -ms-overflow-style: none;
            position: fixed;
            overflow: hidden;
            box-sizing: border-box;
            z-index: 9999;
            width: 100%;
            background: $lighter-grey;
            padding: 20px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            box-shadow: 0 -4px 4px rgba($grey, 0.05);
            border-top: 1px solid $light-grey;
            border-bottom: 1px solid $light-grey;
            font-size: 1rem;
            font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif;
            line-height: 1.5;

            @media (min-width: 768px) {
                flex-direction: row;
            }

            &--bottom {
                bottom: 0;
                left: 0;
                right: 0;
            }

            &--top {
                top: 0;
                left: 0;
                right: 0;
            }

            &__postpone-button {
                margin-right: auto;
                -ms-flex: 1 1 auto;

                @media (min-width: 768px) {
                    margin-right: 10px;
                }

                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }
            }

            &__content {
                margin-right: 0;
                margin-bottom: 20px;
                font-size: 0.9rem;
                max-height: 103px;
                overflow: auto;
                width: 100%;
                -ms-flex: 1 1 auto;

                @media (min-width: 768px) {
                    margin-right: auto;
                    margin-bottom: 0;
                }
            }

            &__buttons {
                transition: $transition;
                display: flex;
                flex-direction: column;
                width: 100%;

                @media (min-width: 768px) {
                    flex-direction: row;
                    width: auto;
                }

                &__button {
                    display: inline-block;
                    font-weight: 400;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    user-select: none;
                    border: 1px solid transparent;
                    padding: 0.375rem 0.75rem;
                    line-height: 1.5;
                    border-radius: 3px;
                    font-size: 0.9rem;

                    &:hover {
                        cursor: pointer;
                        text-decoration: none;
                    }

                    &--accept {
                        -ms-flex: 1 1 auto;
                        background: $green;
                        background: linear-gradient(lighten($green, 5%), $green);
                        color: $white;

                        &:hover {
                            background: $dark-green;
                        }
                    }

                    &--decline {
                        -ms-flex: 1 1 auto;
                        background: $red;
                        background: linear-gradient(lighten($red, 5%), $red);
                        color: $white;
                        margin-bottom: 10px;

                        &:hover {
                            background: $dark-red;
                        }

                        @media (min-width: 768px) {
                            margin-bottom: 0;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }

        // Floating
        &__floating {
            -ms-overflow-style: none;
            position: fixed;
            overflow: hidden;
            box-sizing: border-box;
            z-index: 9999;
            width: 90%;
            background: $off-white;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            box-shadow: 0 4px 8px rgba($grey, 0.3);
            border: 1px solid $light-grey;
            font-size: 1rem;
            font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif;
            line-height: 1.5;
            border-radius: 6px;

            @media (min-width: 768px) {
                max-width: 300px;
            }

            // For now I think the best idea is to show the panel centered
            // and on the bottom when on small screens
            bottom: 10px;
            left: 0;
            right: 0;
            margin: 0 auto;

            @media (min-width: 768px) {
                &--bottom-left {
                    bottom: 20px;
                    left: 20px;
                    right: auto;
                    margin: 0 0;
                }
            }

            @media (min-width: 768px) {
                &--bottom-right {
                    bottom: 20px;
                    right: 20px;
                    left: auto;
                    margin: 0 0;
                }
            }

            @media (min-width: 768px) {
                &--top-right {
                    top: 20px;
                    bottom: auto;
                    right: 20px;
                    left: auto;
                    margin: 0 0;
                }
            }

            @media (min-width: 768px) {
                &--top-left {
                    top: 20px;
                    bottom: auto;
                    right: auto;
                    left: 20px;
                    margin: 0 0;
                }
            }

            &__postpone-button {
                display: inline-flex;
                padding: 5px 0 0 20px;
                margin-bottom: -10px;
                margin-right: auto;

                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }
            }

            &__content {
                font-size: 0.95rem;
                margin-bottom: 5px;
                padding: 15px 20px;
                max-height: 105px;
                overflow: auto;

                @media (min-width: 768px) {
                    margin-bottom: 10px;
                }
            }

            &__buttons {
                transition: $transition;
                display: flex;
                flex-direction: row;
                height: auto;
                width: 100%;


                &__button {
                    background-color: $lighter-grey;
                    font-weight: bold;
                    font-size: 0.90rem;
                    width: 100%;
                    min-height: 40px;
                    white-space: nowrap;
                    user-select: none;
                    border-bottom: 1px solid $light-grey;
                    border-top: 1px solid $light-grey;
                    border-left: none;
                    border-right: none;
                    padding: 0.375rem 0.75rem;

                    &:first-child {
                        border-right: 1px solid $light-grey;
                    }

                    &:hover {
                        cursor: pointer;
                        text-decoration: none;
                    }

                    &--accept {
                        color: $green;
                        -ms-flex: 1 1 auto;

                        &:hover {
                            background: $dark-green;
                            color: $white;
                        }
                    }

                    &--decline {
                        color: $red;
                        -ms-flex: 1 1 auto;

                        &:hover {
                            background: $dark-red;
                            color: $white;
                        }
                    }
                }
            }
        }
    }

    // Animations
    // slideFromBottom
    .slideFromBottom-enter, .slideFromBottom-leave-to {
        transform: translate(0px, 10em);
    }

    .slideFromBottom-enter-to, .slideFromBottom-leave {
        transform: translate(0px, 0px);
    }

    .slideFromBottom-enter-active {
        transition: transform .2s ease-out;
    }

    .slideFromBottom-leave-active {
        transition: transform .2s ease-in;
    }

    // slideFromTop
    .slideFromTop-enter, .slideFromTop-leave-to {
        transform: translate(0px, -10em);
    }

    .slideFromTop-enter-to, .slideFromTop-leave {
        transform: translate(0px, 0px);
    }

    .slideFromTop-enter-active {
        transition: transform .2s ease-out;
    }

    .slideFromTop-leave-active {
        transition: transform .2s ease-in;
    }

    // fade
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>