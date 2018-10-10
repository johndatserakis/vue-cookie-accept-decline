import { set, get } from 'tiny-cookie';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css="@charset \"UTF-8\"; .cookie[data-v-7a32d5aa] { position: fixed; overflow: hidden; box-sizing: border-box; z-index: 9999; width: 100%; background: #EEEEEE; padding: 20px 20px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; box-shadow: 0 -4px 4px rgba(51, 51, 51, 0.01); border-top: 1px solid #d7d7d7; font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif; line-height: 1.5; } @media (min-width: 768px) { .cookie[data-v-7a32d5aa] { flex-direction: row; } } .cookie--bottom[data-v-7a32d5aa] { bottom: 0; left: 0; right: 0; } .cookie--top[data-v-7a32d5aa] { top: 0; left: 0; right: 0; } .cookie__content[data-v-7a32d5aa] { margin-right: 0; margin-bottom: 20px; font-size: 0.9rem; } @media (min-width: 768px) { .cookie__content[data-v-7a32d5aa] { margin-right: 10px; margin-bottom: 0; } } .cookie__buttons[data-v-7a32d5aa] { transition: all 0.2s ease; display: flex; flex-direction: column; width: 100%; } @media (min-width: 768px) { .cookie__buttons[data-v-7a32d5aa] { flex-direction: row; width: auto; } } .cookie__buttons__button[data-v-7a32d5aa] { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.375rem 0.75rem; line-height: 1.5; border-radius: 3px; font-size: 0.9rem; } .cookie__buttons__button[data-v-7a32d5aa]:hover { cursor: pointer; text-decoration: none; } .cookie__buttons__button--accept[data-v-7a32d5aa] { background: #4caf50; color: #fff; } .cookie__buttons__button--accept[data-v-7a32d5aa]:hover { background: #3d8b40; } .cookie__buttons__button--decline[data-v-7a32d5aa] { background: #f44336; color: #fff; margin-bottom: 10px; } .cookie__buttons__button--decline[data-v-7a32d5aa]:hover { background: #ea1c0d; } @media (min-width: 768px) { .cookie__buttons__button--decline[data-v-7a32d5aa] { margin-bottom: 0; margin-right: 10px; } } .slideFromTop-enter[data-v-7a32d5aa], .slideFromTop-leave-to[data-v-7a32d5aa] { transform: translate(0px, -12.5em); } .slideFromTop-enter-to[data-v-7a32d5aa], .slideFromTop-leave[data-v-7a32d5aa] { transform: translate(0px, 0px); } .slideFromBottom-enter[data-v-7a32d5aa], .slideFromBottom-leave-to[data-v-7a32d5aa] { transform: translate(0px, 12.5em); } .slideFromBottom-enter-to[data-v-7a32d5aa], .slideFromBottom-leave[data-v-7a32d5aa] { transform: translate(0px, 0px); } .slideFromBottom-enter-active[data-v-7a32d5aa], .slideFromBottom-leave-active[data-v-7a32d5aa], .slideFromTop-enter-active[data-v-7a32d5aa], .slideFromTop-leave-active[data-v-7a32d5aa] { transition: transform .4s ease-in; } .fade-enter-active[data-v-7a32d5aa], .fade-leave-active[data-v-7a32d5aa] { transition: opacity .5s; } .fade-enter[data-v-7a32d5aa], .fade-leave-to[data-v-7a32d5aa] { opacity: 0; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"appear":"","name":_vm.transitionName}},[(_vm.isOpen)?_c('div',{staticClass:"cookie",class:_vm.containerPosition},[_c('div',{staticClass:"cookie__content"},[_vm._t("message",[_vm._v(" We use cookies to ensure you get the best experience on our website. "),_c('a',{attrs:{"href":"https://cookiesandyou.com/","target":"_blank"}},[_vm._v("Learn More...")])])],2),_vm._v(" "),_c('div',{staticClass:"cookie__buttons"},[(_vm.disableDecline === false)?_c('button',{staticClass:"cookie__buttons__button cookie__buttons__button--decline",on:{"click":_vm.decline}},[_vm._t("declineContent",[_vm._v(" Opt Out ")])],2):_vm._e(),_vm._v(" "),_c('button',{staticClass:"cookie__buttons__button cookie__buttons__button--accept",on:{"click":_vm.accept}},[_vm._t("acceptContent",[_vm._v(" Got It! ")])],2)])]):_vm._e()])},staticRenderFns: [],_scopeId: 'data-v-7a32d5aa',
    name: 'vue-cookie-accept-decline',
    props: {
        debug: {
            type: Boolean,
            default: false
        },

        disableDecline: {
            type: Boolean,
            default: false
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
            status: null,
            supportsLocalStorage: true,
            isOpen: false
        }
    },
    computed: {
        containerPosition: function containerPosition () {
            return ("cookie--" + (this.position))
        }
    },
    mounted: function mounted () {
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

            this.status = visitedType;
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
                    set('vue-cookie-accept-decline', 'accept');
                }
                if (type === 'decline') {
                    set('vue-cookie-accept-decline', 'decline');
                }
            }
        },
        getCookieStatus: function getCookieStatus () {
            if (this.supportsLocalStorage) {
                return localStorage.getItem('vue-cookie-accept-decline')
            } else {
                return get('vue-cookie-accept-decline')
            }
        },
        accept: function accept () {
            if (!this.debug) {
                this.setCookieStatus('accept');
            }

            this.status = 'accept';
            this.isOpen = false;
            this.$emit('clickedAccept');
        },
        decline: function decline () {
            if (!this.debug) {
                this.setCookieStatus('decline');
            }

            this.status = 'decline';
            this.isOpen = false;
            this.$emit('clickedDecline');
        }
    },
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

export default component;
export { install };
