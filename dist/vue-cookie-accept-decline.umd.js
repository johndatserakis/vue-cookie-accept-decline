(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tiny-cookie')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tiny-cookie'], factory) :
    (factory((global.VueCookieAcceptDecline = {}),global.tinyCookie));
}(this, (function (exports,tinyCookie) { 'use strict';

    (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css="@charset \"UTF-8\"; .cookie[data-v-7a32d5aa] { position: fixed; overflow: hidden; box-sizing: border-box; z-index: 9999; width: 100%; background: #EEEEEE; padding: 20px 20px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; box-shadow: 0 -2px 2px 0 rgba(51, 51, 51, 0.02); font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif; line-height: 1.5; } @media (min-width: 768px) { .cookie[data-v-7a32d5aa] { flex-direction: row; } } .cookie--bottom[data-v-7a32d5aa] { bottom: 0; left: 0; right: 0; } .cookie--top[data-v-7a32d5aa] { top: 0; left: 0; right: 0; } .cookie__content[data-v-7a32d5aa] { margin-right: 0; margin-bottom: 20px; font-size: 0.9rem; } @media (min-width: 768px) { .cookie__content[data-v-7a32d5aa] { margin-right: 10px; margin-bottom: 0; } } .cookie__buttons[data-v-7a32d5aa] { transition: all 0.2s ease; display: flex; flex-direction: column; width: 100%; } @media (min-width: 768px) { .cookie__buttons[data-v-7a32d5aa] { flex-direction: row; width: auto; } } .cookie__buttons__button[data-v-7a32d5aa] { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.375rem 0.75rem; line-height: 1.5; border-radius: 4px; font-size: 0.9rem; } .cookie__buttons__button[data-v-7a32d5aa]:hover { cursor: pointer; text-decoration: none; } .cookie__buttons__button--accept[data-v-7a32d5aa] { background: #34CB6E; color: #fff; } .cookie__buttons__button--accept[data-v-7a32d5aa]:hover { background: #248e4d; } .cookie__buttons__button--decline[data-v-7a32d5aa] { background: #F56C6C; color: #fff; margin-bottom: 10px; } .cookie__buttons__button--decline[data-v-7a32d5aa]:hover { background: #f02424; } @media (min-width: 768px) { .cookie__buttons__button--decline[data-v-7a32d5aa] { margin-bottom: 0; margin-right: 10px; } } .slideFromTop-enter[data-v-7a32d5aa], .slideFromTop-leave-to[data-v-7a32d5aa] { transform: translate(0px, -12.5em); } .slideFromTop-enter-to[data-v-7a32d5aa], .slideFromTop-leave[data-v-7a32d5aa] { transform: translate(0px, 0px); } .slideFromBottom-enter[data-v-7a32d5aa], .slideFromBottom-leave-to[data-v-7a32d5aa] { transform: translate(0px, 12.5em); } .slideFromBottom-enter-to[data-v-7a32d5aa], .slideFromBottom-leave[data-v-7a32d5aa] { transform: translate(0px, 0px); } .slideFromBottom-enter-active[data-v-7a32d5aa], .slideFromBottom-leave-active[data-v-7a32d5aa], .slideFromTop-enter-active[data-v-7a32d5aa], .slideFromTop-leave-active[data-v-7a32d5aa] { transition: transform .4s ease-in; } .fade-enter-active[data-v-7a32d5aa], .fade-leave-active[data-v-7a32d5aa] { transition: opacity .5s; } .fade-enter[data-v-7a32d5aa], .fade-leave-to[data-v-7a32d5aa] { opacity: 0; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

    var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"appear":"","name":_vm.transitionName}},[(_vm.isOpen)?_c('div',{staticClass:"cookie",class:_vm.containerPosition},[_c('div',{staticClass:"cookie__content"},[_vm._t("message",[_vm._v(_vm._s(_vm.message))])],2),_vm._v(" "),_c('div',{staticClass:"cookie__buttons"},[_c('button',{staticClass:"cookie__buttons__button cookie__buttons__button--decline",on:{"click":_vm.decline}},[_vm._v("Opt Out")]),_vm._v(" "),_c('button',{staticClass:"cookie__buttons__button cookie__buttons__button--accept",on:{"click":_vm.accept}},[_vm._v("Got It!")])])]):_vm._e()])},staticRenderFns: [],_scopeId: 'data-v-7a32d5aa',
        name: 'vue-cookie-accept-decline',
        props: {
            debug: {
                type: Boolean,
                default: false
            },

            message: {
                type: String,
                default: 'We use cookies to ensure you get the best experience on our website.'
            },

            // bottom, top
            position: {
                type: String,
                default: 'bottom'
            },

            // slideFromBottom, slideFromTop, fade
            transitionName: {
                type: String,
                default: 'slideFromBottom'
            }
        },
        data: function data () {
            return {
                supportsLocalStorage: true,
                isOpen: false
            }
        },
        computed: {
            containerPosition: function containerPosition () {
                return ("cookie--" + (this.position))
            }
        },
        created: function created () {
            this.checkLocalStorageFunctionality();
            this.init();
        },
        methods: {
            init: function init () {
                var visitedType = this.getCookieStatus();
                if (visitedType && (visitedType === 'accept' || visitedType === 'decline')) {
                    this.isOpen = false;
                }

                if (!visitedType) {
                    this.isOpen = true;
                }

                this.$emit('status', visitedType);
            },
            checkLocalStorageFunctionality: function checkLocalStorageFunctionality () {
                // Check for availability of localStorage
                try {
                    var test = '__vue-cookie-accept-decline-check-localStorage';
                    window.localStorage.setItem(test, test);
                    window.localStorage.removeItem(test);
                } catch (e) {
                    console.error('Local storage is not supported, falling back to cookie use');
                    this.supportsLocalStorage = false;
                }
            },
            setCookieStatus: function setCookieStatus (type) {
                if (this.supportsLocalStorage) {
                    if (type === 'accept') {
                        localStorage.setItem('vue-cookie-accept-decline', 'accept');
                    }
                    if (type === 'decline') {
                        localStorage.setItem('vue-cookie-accept-decline', 'decline');
                    }
                } else {
                    if (type === 'accept') {
                        tinyCookie.set('vue-cookie-accept-decline', 'accept');
                    }
                    if (type === 'decline') {
                        tinyCookie.set('vue-cookie-accept-decline', 'decline');
                    }
                }
            },
            getCookieStatus: function getCookieStatus () {
                if (this.supportsLocalStorage) {
                    return localStorage.getItem('vue-cookie-accept-decline')
                } else {
                    return tinyCookie.get('vue-cookie-accept-decline')
                }
            },
            accept: function accept () {
                if (!this.debug) {
                    this.setCookieStatus('accept');
                }

                this.isOpen = false;
                this.$emit('clickedAccept');
            },
            decline: function decline () {
                if (!this.debug) {
                    this.setCookieStatus('decline');
                }

                this.isOpen = false;
                this.$emit('clickedDecline');
            }
        },
        mounted: function mounted () {
        }
    }

    // Import vue component

    // install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('VueCookieAcceptDecline', component);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // To auto-install when vue is found
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    // It's possible to expose named exports when writing components that can
    // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
    // export const RollupDemoDirective = component;

    exports.install = install;
    exports.default = component;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
