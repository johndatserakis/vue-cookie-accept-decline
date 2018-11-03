import { set, get } from 'tiny-cookie';

//

var script = {
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

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { appear: "", name: _vm.transitionName } }, [
    _vm.isOpen
      ? _c(
          "div",
          {
            staticClass: "cookie",
            class: [
              "cookie__" + _vm.type,
              "cookie__" + _vm.type + "--" + _vm.position
            ],
            attrs: { id: _vm.elementId }
          },
          [
            _c(
              "div",
              { class: "cookie__" + _vm.type + "__content" },
              [
                _vm._t("message", [
                  _vm._v(
                    "\n                We use cookies to ensure you get the best experience on our website. "
                  ),
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "https://cookiesandyou.com/",
                        target: "_blank"
                      }
                    },
                    [_vm._v("Learn More...")]
                  )
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c("div", { class: "cookie__" + _vm.type + "__buttons" }, [
              _vm.disableDecline === false
                ? _c(
                    "button",
                    {
                      class: [
                        "cookie__" + _vm.type + "__buttons__button",
                        "cookie__" + _vm.type + "__buttons__button--decline"
                      ],
                      on: { click: _vm.decline }
                    },
                    [
                      _vm._t("declineContent", [
                        _vm._v(
                          "\n                    Opt Out\n                "
                        )
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "button",
                {
                  class: [
                    "cookie__" + _vm.type + "__buttons__button",
                    "cookie__" + _vm.type + "__buttons__button--accept"
                  ],
                  on: { click: _vm.accept }
                },
                [
                  _vm._t("acceptContent", [
                    _vm._v("\n                    Got It!\n                ")
                  ])
                ],
                2
              )
            ])
          ]
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = "data-v-30d19797";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/johndatserakis/Documents/Code/vue-cookie-accept-decline/src/vue-cookie-accept-decline.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var component = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  )

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
