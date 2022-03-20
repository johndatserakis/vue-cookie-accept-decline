import { set, get } from 'tiny-cookie';
import { openBlock, createBlock, Transition, withCtx, createElementBlock, normalizeClass, createElementVNode, renderSlot, createCommentVNode, createTextVNode } from 'vue';

var script = {
  name: 'vue-cookie-accept-decline',
  props: {
    elementId: {
      type: String,
      required: true,
    },

    debug: {
      type: Boolean,
      default: false,
    },

    disableDecline: {
      type: Boolean,
      default: false,
    },

    // floating: bottom-left, bottom-right, top-left, top-rigt
    // bar:  bottom, top
    position: {
      type: String,
      default: 'bottom-left',
    },

    // floating, bar
    type: {
      type: String,
      default: 'floating',
    },

    // slideFromBottom, slideFromTop, fade
    transitionName: {
      type: String,
      default: 'slideFromBottom',
    },

    showPostponeButton: {
      type: Boolean,
      default: false,
    },

    forceCookies: {
      type: Boolean,
      default: false,
    },
  },
  data: function data () {
    return {
      status: null,
      supportsLocalStorage: true,
      isOpen: false,
    };
  },
  computed: {
    containerPosition: function containerPosition () {
      return ("cookie--" + (this.position));
    },
    containerType: function containerType () {
      return ("cookie--" + (this.type));
    },
  },
  mounted: function mounted () {
    this.checkLocalStorageFunctionality();
    this.init();
  },
  methods: {
    init: function init () {
      var visitedType = this.getCookieStatus();

      if (
        visitedType &&
        (visitedType === 'accept' || visitedType === 'decline' || visitedType === 'postpone')
      ) {
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
        return localStorage.getItem(("vue-cookie-accept-decline-" + (this.elementId)));
      } else {
        return get(("vue-cookie-accept-decline-" + (this.elementId)));
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
    },
  },
};

var _hoisted_1 = ["id"];
var _hoisted_2 = /*#__PURE__*/createTextVNode("×");
var _hoisted_3 = /*#__PURE__*/createTextVNode(" We use cookies to ensure you get the best experience on our website. ");
var _hoisted_4 = /*#__PURE__*/createElementVNode("a", {
  href: "https://cookiesandyou.com/",
  target: "_blank"
}, "Learn More...", -1 /* HOISTED */);
var _hoisted_5 = /*#__PURE__*/createTextVNode("Opt Out");
var _hoisted_6 = /*#__PURE__*/createTextVNode("Got It!");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    appear: "",
    name: $props.transitionName
  }, {
    default: withCtx(function () { return [
      ($data.isOpen)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["cookie", ['cookie__' + $props.type, 'cookie__' + $props.type + '--' + $props.position]]),
            id: $props.elementId
          }, [
            createElementVNode("div", {
              class: normalizeClass('cookie__' + $props.type + '__wrap')
            }, [
              ($props.showPostponeButton === true)
                ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    onClick: _cache[0] || (_cache[0] = function () {
                      var args = [], len = arguments.length;
                      while ( len-- ) args[ len ] = arguments[ len ];

                      return ($options.postpone && $options.postpone.apply($options, args));
      }),
                    class: normalizeClass('cookie__' + $props.type + '__postpone-button'),
                    title: "Close"
                  }, [
                    renderSlot(_ctx.$slots, "postponeContent", {}, function () { return [
                      _hoisted_2
                    ]; })
                  ], 2 /* CLASS */))
                : createCommentVNode("v-if", true),
              createElementVNode("div", {
                class: normalizeClass('cookie__' + $props.type + '__content')
              }, [
                renderSlot(_ctx.$slots, "message", {}, function () { return [
                  _hoisted_3,
                  _hoisted_4
                ]; })
              ], 2 /* CLASS */),
              createElementVNode("div", {
                class: normalizeClass('cookie__' + $props.type + '__buttons')
              }, [
                ($props.disableDecline === false)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: _cache[1] || (_cache[1] = function () {
                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];

                        return ($options.decline && $options.decline.apply($options, args));
      }),
                      class: normalizeClass([
              'cookie__' + $props.type + '__buttons__button',
              'cookie__' + $props.type + '__buttons__button--decline' ])
                    }, [
                      renderSlot(_ctx.$slots, "declineContent", {}, function () { return [
                        _hoisted_5
                      ]; })
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true),
                createElementVNode("button", {
                  onClick: _cache[2] || (_cache[2] = function () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    return ($options.accept && $options.accept.apply($options, args));
      }),
                  class: normalizeClass([
              'cookie__' + $props.type + '__buttons__button',
              'cookie__' + $props.type + '__buttons__button--accept' ])
                }, [
                  renderSlot(_ctx.$slots, "acceptContent", {}, function () { return [
                    _hoisted_6
                  ]; })
                ], 2 /* CLASS */)
              ], 2 /* CLASS */)
            ], 2 /* CLASS */)
          ], 10 /* CLASS, PROPS */, _hoisted_1))
        : createCommentVNode("v-if", true)
    ]; }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script.render = render;
script.__file = "src/vue-cookie-accept-decline.vue";

// Import vue component

function install(app) {
  if (install.installed) { return; }

  install.installed = true;
  app.component('VueCookieAcceptDecline', script);
}

var plugin = { install: install };

// To auto-install when Vue is found
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

export default script;
export { install };
