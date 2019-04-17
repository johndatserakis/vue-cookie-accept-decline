<p align="center"><a href="" target="_blank"><img style="max-width: 100%; display: block; max-height: 400px;" src="https://media.giphy.com/media/cl1GNqW9FZJyOppje2/giphy.gif"></a></p>

# vue-cookie-accept-decline

Show a banner with text, a decline button, and an accept button on your page. Remembers selection using cookies. Emits an event with current selection on creation. Good for GDPR requirements or telling your users something that they can act on and then not see again.

<p align="left">
  <a href="https://www.npmjs.com/package/vue-cookie-accept-decline"><img src="https://img.shields.io/npm/v/vue-cookie-accept-decline.svg" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/vue-cookie-accept-decline"><img src="https://img.shields.io/npm/dm/vue-cookie-accept-decline.svg" alt="NPM Downloads"></a>
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpromosis%2Fvue-cookie-accept-decline&text=Check%20out%20vue-cookie-accept-decline%20on%20GitHub&via=promosis">
  <img src="https://img.shields.io/twitter/url/https/github.com/promosis/vue-cookie-accept-decline.svg?style=social" alt="Tweet"></a>
</p>

### Links

[View demo](https://promosis.github.io/vue-cookie-accept-decline/)

[View on npm](https://www.npmjs.com/package/vue-cookie-accept-decline)

[View on GitHub](https://github.com/promosis/vue-cookie-accept-decline)

### Install

```
# npm
npm i vue-cookie-accept-decline

#yarn
yarn add vue-cookie-accept-decline
```

Or you can include it through the browser at the bottom of your page along with the css:

```html
<!-- Please note if you're using the browser method you're going to want to adjust the version number as needed. -->

<script src="https://unpkg.com/vue-cookie-accept-decline@5.2.3/dist/vue-cookie-accept-decline.min.js"></script>

<link rel="stylesheet" type="text/css" href="https://unpkg.com/vue-cookie-accept-decline@5.2.3/dist/vue-cookie-accept-decline.css">
```

### About

We needed a component to show a privacy banners on pages - came across the awesome [vue-cookie-law](https://github.com/apertureless/vue-cookie-law) by [apertureless](https://github.com/apertureless) and it was almost what was needed, except we needed to track the option of an opt-out/decline which seemed a bit out of scope for that project - so `vue-cookie-accept-decline` is the result.

The big difference here is that `vue-cookie-accept-decline` allows the user to decline the text on the banner - this is important because you may want to *not* uses cookies in your app if they have declined the oppurtunity to be tracked.

When the  decline or accept buttons are clicked, they will emit the events `clicked-accept` and `clicked-declined` respectively. Also, on creation, the component will emit a `status` event with a value of the current setting, `null` for nothing set, `accept` for an accepted banner, and `decline` for a declined banner. You can listen to this event on the component and do something like disable cookies if you see they have declined the banner. The component also has an optional `postpone` close button that will let the users dismiss the message without selecting an option.

Each instance of the component requires the prop of `elementId` - this is to allow for the use of multiple instances of `vue-cookie-accept-decline` on the same page. To delete the cookie for a specific instance, set the `ref` property on your instance and call the exposed `removeCookie` method like this: `this.$refs.myPanel1.removeCookie()`. You can then call `this.$refs.myPanel1.init()` to show the user the panel again. See the demo page for a detailed example.

### Usage Example

```html
<!-- css import for when you want to import the component css into your css file/files  -->
@import '/path/to/node_modules/vue-cookie-accept-decline.css';

<!-- css import for when you're importing the css directly in your js  -->
import 'vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css'

import VueCookieAcceptDecline from 'vue-cookie-accept-decline'
Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline)
```

```html
<vue-cookie-accept-decline
    :ref="'myPanel1'"
    :elementId="'myPanel1'"
    :debug="false"
    :position="'bottom-left'"
    :type="'floating'"
    :disableDecline="false"
    :transitionName="'slideFromBottom'"
    :showPostponeButton="false"
    @status="cookieStatus"
    @clicked-accept="cookieClickedAccept"
    @clicked-decline="cookieClickedDecline">

    <!-- Optional -->
    <div slot="postponeContent">
        &times;
    </div>

    <!-- Optional -->
    <div slot="message">
        We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a>
    </div>

    <!-- Optional -->
    <div slot="declineContent">
       OPT OUT
    </div>

    <!-- Optional -->
    <div slot="acceptContent">
        GOT IT!
    </div>
</vue-cookie-accept-decline>
```

### Props

| prop           | type    | required | default         | possible values                     | description                                                          |
|----------------|---------|----------|-----------------|-------------------------------------|----------------------------------------------------------------------|
| ref            | String  | no       | none            | Any String                          | Unique string that gives you control over the component |
| elementId      | string  | yes      | none            | Any String                          | The unique id for the instance. This string will be appened to the string 'vue-cookie-accept-decline-' to allow for multiple components. |
| debug          | boolean | no       | false           | true, false                         | If true, the cookie is never saved, only the events will be emitted |
| position       | string  | no       | bottom          | For floating: bottom-left, bottom-right, top-left, top-right -- For bar: bottom, top | Position of the banner   |
| type           | string  | no       | floating        | floating, bar                       | Type of banner   |
| disableDecline | boolean | no       | false           | true, false                         | If true, the 'opt out' button is not shown |
| transitionName | string  | no       | slideFromBottom | slideFromBottom, slideFromTop, fade | Banner animation type    |
| showPostponeButton | boolean  | no  | false           | true, false                         | Optionally show a close button that allows the user to postpone selecting an option. |


### Events

| event          | value                     | description                                                   |
|----------------|---------------------------|---------------------------------------------------------------|
| status         | 'accept', 'decline', 'postpone', null | Event will be emitted when component is created.             |
| clicked-accept  | none                     | Event will be emitted when accept is clicked on the banner.   |
| clicked-decline | none                     | Event will be emitted when declined is clicked on the banner. |
| clicked-postpone | none                    | Event will be emitted when postponed is clicked on the banner. |
| removed-cookie | none                      | Event will be emitted when the cookie has been removed using the `removeCookie()` method. |

### Slots

There are slots for your own custom `message`, `declineContent`, `acceptContent`, this is good for providing your own link or whatever HTML content you want in your message/buttons - like icons.

| name           | default value |
|----------------|--------------|
| message        | We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a> |
| declineContent | Opt Out |
| acceptContent  | Got It! |
| postponeContent  | `&times;` |

### Methods

Note - call these methods through the `ref` you set up with your component. Example: `this.$refs.myPanel1.removeCookie()`.

| method    | parameters  | description                    |
|---------|-------|--------------------------------|
| removeCookie | none | Used to delete the unique cookie for the instance you are acting on. |
| init | none | Evaluates the cookie status and shows the panel if proper conditions are met. Useful for re-showing the panel after someone uses the `removeCookie` method. |

### SASS Structure

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

### Full Example

[![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wn41j56j55?module=%2Fsrc%2Fcomponents%2FHelloWorld.vue)

### Development

``` bash
# install dependencies
npm install

# serve with hot reload
npm run watch

# run the tests
npm run test

# build demo page
npm run build:example

# build library
npm run build:library

# build everything and run tests
npm run build
```

### Thank You

Thank you [apertureless](https://github.com/apertureless) for [vue-cookie-law](https://github.com/apertureless/vue-cookie-law). Go check out `vue-cookie-law` and his other projects. Also, thank you [insites](https://github.com/insites) for [cookieconsent](https://github.com/insites/cookieconsent).

### Other

Go ahead and fork the project! Submit an issue if needed. Have fun!

### License

[MIT](http://opensource.org/licenses/MIT)

Packaged with a mixture of [vue-lib-template](https://github.com/biigpongsatorn/vue-lib-template) and [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup).