import { set, get } from 'tiny-cookie';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css="@charset \"UTF-8\"; .cookie__bar[data-v-7a32d5aa] { position: fixed; overflow: hidden; box-sizing: border-box; z-index: 9999; width: 100%; background: #eee; padding: 20px 20px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; box-shadow: 0 -4px 4px rgba(198, 198, 198, 0.05); border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif; line-height: 1.5; } @media (min-width: 768px) { .cookie__bar[data-v-7a32d5aa] { flex-direction: row; } } .cookie__bar--bottom[data-v-7a32d5aa] { bottom: 0; left: 0; right: 0; } .cookie__bar--top[data-v-7a32d5aa] { top: 0; left: 0; right: 0; } .cookie__bar__content[data-v-7a32d5aa] { margin-right: 0; margin-bottom: 20px; font-size: 0.9rem; max-height: 103px; overflow: scroll; } @media (min-width: 768px) { .cookie__bar__content[data-v-7a32d5aa] { margin-right: 10px; margin-bottom: 0; } } .cookie__bar__buttons[data-v-7a32d5aa] { transition: all 0.2s ease; display: flex; flex-direction: column; width: 100%; } @media (min-width: 768px) { .cookie__bar__buttons[data-v-7a32d5aa] { flex-direction: row; width: auto; } } .cookie__bar__buttons__button[data-v-7a32d5aa] { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.375rem 0.75rem; line-height: 1.5; border-radius: 3px; font-size: 0.9rem; } .cookie__bar__buttons__button[data-v-7a32d5aa]:hover { cursor: pointer; text-decoration: none; } .cookie__bar__buttons__button--accept[data-v-7a32d5aa] { background: #4caf50; background: linear-gradient(#5cb860, #4caf50); color: #fff; } .cookie__bar__buttons__button--accept[data-v-7a32d5aa]:hover { background: #409343; } .cookie__bar__buttons__button--decline[data-v-7a32d5aa] { background: #f44336; background: linear-gradient(#f55a4e, #f44336); color: #fff; margin-bottom: 10px; } .cookie__bar__buttons__button--decline[data-v-7a32d5aa]:hover { background: #f21f0f; } @media (min-width: 768px) { .cookie__bar__buttons__button--decline[data-v-7a32d5aa] { margin-bottom: 0; margin-right: 10px; } } .cookie__floating[data-v-7a32d5aa] { position: fixed; overflow: hidden; box-sizing: border-box; z-index: 9999; width: 90%; background: #fafafa; display: flex; justify-content: space-between; flex-direction: column; box-shadow: 0 4px 8px rgba(198, 198, 198, 0.3); border: 1px solid #ddd; font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif; line-height: 1.5; border-radius: 6px; bottom: 10px; left: 0; right: 0; margin: 0 auto; } @media (min-width: 768px) { .cookie__floating[data-v-7a32d5aa] { max-width: 300px; } } @media (min-width: 768px) { .cookie__floating--bottom-left[data-v-7a32d5aa] { bottom: 20px; left: 20px; right: auto; margin: 0 0; } } @media (min-width: 768px) { .cookie__floating--bottom-right[data-v-7a32d5aa] { bottom: 20px; right: 20px; left: auto; margin: 0 0; } } @media (min-width: 768px) { .cookie__floating--top-right[data-v-7a32d5aa] { top: 20px; bottom: auto; right: 20px; left: auto; margin: 0 0; } } @media (min-width: 768px) { .cookie__floating--top-left[data-v-7a32d5aa] { top: 20px; bottom: auto; right: auto; left: 20px; margin: 0 0; } } .cookie__floating__content[data-v-7a32d5aa] { font-size: 0.95rem; margin-bottom: 5px; padding: 15px 20px; max-height: 103px; overflow: scroll; } @media (min-width: 768px) { .cookie__floating__content[data-v-7a32d5aa] { margin-bottom: 10px; } } .cookie__floating__buttons[data-v-7a32d5aa] { transition: all 0.2s ease; display: flex; flex-direction: row; height: 100%; width: 100%; } .cookie__floating__buttons__button[data-v-7a32d5aa] { background-color: #eee; font-weight: bold; font-size: 0.90rem; width: 100%; min-height: 40px; white-space: nowrap; user-select: none; border-bottom: 1px solid #ddd; border-top: 1px solid #ddd; border-left: none; border-right: none; padding: 0.375rem 0.75rem; } .cookie__floating__buttons__button[data-v-7a32d5aa]:first-child { border-right: 1px solid #ddd; } .cookie__floating__buttons__button[data-v-7a32d5aa]:hover { cursor: pointer; text-decoration: none; } .cookie__floating__buttons__button--accept[data-v-7a32d5aa] { color: #4caf50; } .cookie__floating__buttons__button--accept[data-v-7a32d5aa]:hover { background: #409343; color: #fff; } .cookie__floating__buttons__button--decline[data-v-7a32d5aa] { color: #f44336; } .cookie__floating__buttons__button--decline[data-v-7a32d5aa]:hover { background: #f21f0f; color: #fff; } .slideFromBottom-enter[data-v-7a32d5aa], .slideFromBottom-leave-to[data-v-7a32d5aa] { transform: translate(0px, 10em); } .slideFromBottom-enter-to[data-v-7a32d5aa], .slideFromBottom-leave[data-v-7a32d5aa] { transform: translate(0px, 0px); } .slideFromBottom-enter-active[data-v-7a32d5aa] { transition: transform .2s ease-out; } .slideFromBottom-leave-active[data-v-7a32d5aa] { transition: transform .2s ease-in; } .slideFromTop-enter[data-v-7a32d5aa], .slideFromTop-leave-to[data-v-7a32d5aa] { transform: translate(0px, -10em); } .slideFromTop-enter-to[data-v-7a32d5aa], .slideFromTop-leave[data-v-7a32d5aa] { transform: translate(0px, 0px); } .slideFromTop-enter-active[data-v-7a32d5aa] { transition: transform .2s ease-out; } .slideFromTop-leave-active[data-v-7a32d5aa] { transition: transform .2s ease-in; } .fade-enter-active[data-v-7a32d5aa], .fade-leave-active[data-v-7a32d5aa] { transition: opacity .5s; } .fade-enter[data-v-7a32d5aa], .fade-leave-to[data-v-7a32d5aa] { opacity: 0; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"appear":"","name":_vm.transitionName}},[(_vm.isOpen)?_c('div',{staticClass:"cookie",class:['cookie__' + _vm.type, 'cookie__' + _vm.type + '--' + _vm.position],attrs:{"id":_vm.elementId}},[_c('div',{class:'cookie__' + _vm.type + '__content'},[_vm._t("message",[_vm._v(" We use cookies to ensure you get the best experience on our website. "),_c('a',{attrs:{"href":"https://cookiesandyou.com/","target":"_blank"}},[_vm._v("Learn More...")])])],2),_vm._v(" "),_c('div',{class:'cookie__' + _vm.type + '__buttons'},[(_vm.disableDecline === false)?_c('button',{class:['cookie__' + _vm.type + '__buttons__button', 'cookie__' + _vm.type + '__buttons__button--decline'],on:{"click":_vm.decline}},[_vm._t("declineContent",[_vm._v(" Opt Out ")])],2):_vm._e(),_vm._v(" "),_c('button',{class:['cookie__' + _vm.type + '__buttons__button', 'cookie__' + _vm.type + '__buttons__button--accept'],on:{"click":_vm.accept}},[_vm._t("acceptContent",[_vm._v(" Got It! ")])],2)])]):_vm._e()])},staticRenderFns: [],_scopeId: 'data-v-7a32d5aa',
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
        },
        containerType: function containerType () {
            return ("cookie--" + (this.type))
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
                    localStorage.setItem(("vue-cookie-accept-decline-" + (this.elementId)), 'accept');
                }
                if (type === 'decline') {
                    localStorage.setItem(("vue-cookie-accept-decline-" + (this.elementId)), 'decline');
                }
            } else {
                if (type === 'accept') {
                    set(("vue-cookie-accept-decline-" + (this.elementId)), 'accept');
                }
                if (type === 'decline') {
                    set(("vue-cookie-accept-decline-" + (this.elementId)), 'decline');
                }
            }
        },
        getCookieStatus: function getCookieStatus () {
            if (this.supportsLocalStorage) {
                return localStorage.getItem(("vue-cookie-accept-decline-" + (this.elementId)))
            } else {
                return get(("vue-cookie-accept-decline-" + (this.elementId)))
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
        },
        removeCookie: function removeCookie () {
            localStorage.removeItem(("vue-cookie-accept-decline-" + (this.elementId)));
            this.status = null;
            this.$emit('removedCookie');
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
