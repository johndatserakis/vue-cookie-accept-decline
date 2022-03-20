# vue-cookie-accept-decline

Show a banner with text, a decline button, and an accept button on your page. Remembers selection using cookies. Emits an event with current selection on creation. Good for GDPR requirements or telling your users something that they can act on and then not see again.

<p align="left">
  <a href="https://www.npmjs.com/package/vue-cookie-accept-decline"><img src="https://img.shields.io/npm/v/vue-cookie-accept-decline.svg" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/vue-cookie-accept-decline"><img src="https://img.shields.io/npm/dm/vue-cookie-accept-decline.svg" alt="NPM Downloads"></a>
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjohndatserakis%2Fvue-cookie-accept-decline&text=Check%20out%20vue-cookie-accept-decline%20on%20GitHub&via=johndatserakis">
  <img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/vue-cookie-accept-decline.svg?style=social" alt="Tweet"></a>
</p>

## Vue 3 Support

Vue 3 is supported from `v6.0.0` and beyond (current `master`). To use `vue-cookie-accept-decline` with Vue 2, use `v5.4.0`.

## Links

- [Demo](https://johndatserakis.github.io/vue-cookie-accept-decline)
- [GitHub](https://github.com/johndatserakis/vue-cookie-accept-decline)
- [npm](https://www.npmjs.com/package/vue-cookie-accept-decline)

## Install

```
yarn add vue-cookie-accept-decline
```

Or you can include it through the browser at the bottom of your page along with the css:

```html
<script src="https://unpkg.com/vue-cookie-accept-decline/dist/vue-cookie-accept-decline.min.js"></script>

<link
  rel="stylesheet"
  type="text/css"
  href="https://unpkg.com/vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css"
/>
```

## About

We needed a component to show a privacy banners on pages - came across the awesome [vue-cookie-law](https://github.com/apertureless/vue-cookie-law) by [apertureless](https://github.com/apertureless) and it was almost what was needed, except we needed to track the option of an opt-out/decline which seemed a bit out of scope for that project - so `vue-cookie-accept-decline` is the result.

The big difference here is that `vue-cookie-accept-decline` allows the user to decline the text on the banner - this is important because you may want to _not_ uses cookies in your app if they have declined the oppurtunity to be tracked.

When the decline or accept buttons are clicked, they will emit the events `clicked-accept` and `clicked-declined` respectively. Also, on creation, the component will emit a `status` event with a value of the current setting, `null` for nothing set, `accept` for an accepted banner, and `decline` for a declined banner. You can listen to this event on the component and do something like disable cookies if you see they have declined the banner. The component also has an optional `postpone` close button that will let the users dismiss the message without selecting an option.

Each instance of the component requires the prop of `elementId` - this is to allow for the use of multiple instances of `vue-cookie-accept-decline` on the same page. To delete the cookie for a specific instance, set the `ref` property on your instance and call the exposed `removeCookie` method like this: `this.$refs.myPanel1.removeCookie()`. You can then call `this.$refs.myPanel1.init()` to show the user the panel again. See the demo page for a detailed example.

## Usage Example

```js
import { createApp } from 'vue';
import VueCookieAcceptDecline from 'vue-cookie-accept-decline';
import 'vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css';

const app = createApp(App);

app.component('vue-cookie-accept-decline', VueCookieAcceptDecline);
```

```vue
<vue-cookie-accept-decline
  :debug="false"
  :disableDecline="false"
  :showPostponeButton="false"
  @clicked-accept="cookieClickedAccept"
  @clicked-decline="cookieClickedDecline"
  @clicked-postpone="cookieClickedPostpone"
  @removed-cookie="cookieRemovedCookie"
  @status="cookieStatus"
  elementId="myPanel1"
  position="bottom-left"
  ref="myPanel1"
  transitionName="slideFromBottom"
  type="floating"
>
  <!-- Optional -->
  <template #postponeContent>&times;</template>

  <!-- Optional -->
  <template #message>
    We use cookies to ensure you get the best experience on our website.
    <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a>
  </template>

  <!-- Optional -->
  <template #declineContent>Opt Out</template>

  <!-- Optional -->
  <template #acceptContent>Got It!</template>
</vue-cookie-accept-decline>
```

## Props

| prop               | type    | required | default         | possible values                                                                      | description                                                                                                                              |
| ------------------ | ------- | -------- | --------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ref                | String  | no       | none            | Any String                                                                           | Unique string that gives you control over the component                                                                                  |
| elementId          | string  | yes      | none            | Any String                                                                           | The unique id for the instance. This string will be appened to the string 'vue-cookie-accept-decline-' to allow for multiple components. |
| debug              | boolean | no       | false           | true, false                                                                          | If true, the cookie is never saved, only the events will be emitted                                                                      |
| position           | string  | no       | bottom          | For floating: bottom-left, bottom-right, top-left, top-right -- For bar: bottom, top | Position of the banner                                                                                                                   |
| type               | string  | no       | floating        | floating, bar                                                                        | Type of banner                                                                                                                           |
| disableDecline     | boolean | no       | false           | true, false                                                                          | If true, the 'opt out' button is not shown                                                                                               |
| transitionName     | string  | no       | slideFromBottom | slideFromBottom, slideFromTop, fade                                                  | Banner animation type                                                                                                                    |
| showPostponeButton | boolean | no       | false           | true, false                                                                          | Optionally show a close button that allows the user to postpone selecting an option.                                                     |
| forceCookies       | boolean | no       | false           | true, false                                                                          | Optionally force cookies storage                                                                                                         |

## Events

| event            | value                                 | description                                                                               |
| ---------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| status           | 'accept', 'decline', 'postpone', null | Event will be emitted when component is created.                                          |
| clicked-accept   | none                                  | Event will be emitted when accept is clicked on the banner.                               |
| clicked-decline  | none                                  | Event will be emitted when declined is clicked on the banner.                             |
| clicked-postpone | none                                  | Event will be emitted when postponed is clicked on the banner.                            |
| removed-cookie   | none                                  | Event will be emitted when the cookie has been removed using the `removeCookie()` method. |

## Slots

There are slots for your own custom `message`, `declineContent`, `acceptContent`, this is good for providing your own link or whatever HTML content you want in your message/buttons - like icons.

| name            | default value                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| message         | We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a> |
| declineContent  | Opt Out                                                                                                                                     |
| acceptContent   | Got It!                                                                                                                                     |
| postponeContent | `&times;`                                                                                                                                   |

## Methods

Note - call these methods through the `ref` you set up with your component. Example: `this.$refs.myPanel1.removeCookie()`.

| method       | parameters | description                                                                                                                                                 |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| removeCookie | none       | Used to delete the unique cookie for the instance you are acting on.                                                                                        |
| init         | none       | Evaluates the cookie status and shows the panel if proper conditions are met. Useful for re-showing the panel after someone uses the `removeCookie` method. |

## SASS Structure

```sass
.cookie {
  // Bar style
  &__bar {
    &--bottom {
    }

    &--top {
    }

    &__postpone-button {
    }

    &__content {
    }

    &__buttons {

      &__button {
        &--accept {
        }

        &--decline {
        }
      }
    }
  }

  // Floating style
  &__floating {
    &--bottom-left {
    }

    &--bottom-right {
    }

    &--top-right {
    }

    &--top-left {
    }

    &__postpone-button {
    }

    &__content {
    }

    &__buttons {

      &__button {
        &--accept {
        }

        &--decline {
        }
      }
    }
  }
}
```

## Development

```bash
# Install dependencies
yarn

# Serve with hot reload
yarn dev

# Run the tests
yarn test

# Build demo page
yarn build:example

# Build library
yarn build:library

# Build everything and run tests
yarn build
```

## Thank You

Thank you [apertureless](https://github.com/apertureless) for [vue-cookie-law](https://github.com/apertureless/vue-cookie-law). Go check out `vue-cookie-law` and his other projects. Also, thank you [insites](https://github.com/insites) for [cookieconsent](https://github.com/insites/cookieconsent).

## Other

Go ahead and fork the project! Submit an issue if needed. Have fun!

## License

[MIT](http://opensource.org/licenses/MIT)
