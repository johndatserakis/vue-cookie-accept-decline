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
        },

        showPostponeButton: {
            type: Boolean,
            default: false
        },

        forceCookies: {
            type: Boolean,
            default: false
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
            if (visitedType && (visitedType === 'accept' || visitedType === 'decline' || visitedType === 'postpone')) {
                this.isOpen = false;
            }

            if (!visitedType) {
                this.isOpen = true;
            }

            this.status = visitedType;
            this.$emit('status', visitedType);
        },
        checkLocalStorageFunctionality: function checkLocalStorageFunctionality () {

            if (this.forceCookies) {
                this.supportsLocalStorage = false;
                return;
            }

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
                if (type === 'postpone') {
                    localStorage.setItem(("vue-cookie-accept-decline-" + (this.elementId)), 'postpone');
                }
            } else {
                if (type === 'accept') {
                    set(("vue-cookie-accept-decline-" + (this.elementId)), 'accept');
                }
                if (type === 'decline') {
                    set(("vue-cookie-accept-decline-" + (this.elementId)), 'decline');
                }
                if (type === 'postpone') {
                    set(("vue-cookie-accept-decline-" + (this.elementId)), 'postpone');
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
            this.$emit('clicked-accept');
        },
        decline: function decline () {
            if (!this.debug) {
                this.setCookieStatus('decline');
            }

            this.status = 'decline';
            this.isOpen = false;
            this.$emit('clicked-decline');
        },
        postpone: function postpone () {
            if (!this.debug) {
                this.setCookieStatus('postpone');
            }

            this.status = 'postpone';
            this.isOpen = false;
            this.$emit('clicked-postpone');
        },
        removeCookie: function removeCookie () {
            localStorage.removeItem(("vue-cookie-accept-decline-" + (this.elementId)));
            this.status = null;
            this.$emit('removed-cookie');
        }
    },
}

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

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
            _c("div", { class: "cookie__" + _vm.type + "__wrap" }, [
              _vm.showPostponeButton === true
                ? _c(
                    "div",
                    {
                      class: "cookie__" + _vm.type + "__postpone-button",
                      attrs: { title: "Close" },
                      on: { click: _vm.postpone }
                    },
                    [
                      _vm._t("postponeContent", [
                        _vm._v("\n                    ×\n                ")
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { class: "cookie__" + _vm.type + "__content" },
                [
                  _vm._t("message", [
                    _vm._v(
                      "\n                    We use cookies to ensure you get the best experience on our website. "
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
                            "\n                        Opt Out\n                    "
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
                      _vm._v(
                        "\n                        Got It!\n                    "
                      )
                    ])
                  ],
                  2
                )
              ])
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
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var component = normalizeComponent_1(
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
