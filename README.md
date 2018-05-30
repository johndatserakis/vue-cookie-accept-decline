# vue-cookie-accept-decline

Show a banner with text, a decline button, and an accept button on your page. Remembers selection with using cookies. Emits an event with current selection on creation. Good for GDPR requirements.

### Demo

[View Demo](https://promosis.github.io/vue-cookie-accept-decline/)

### Install

```
# npm
npm i vue-cookie-accept-decline

#yarn
yarn add vue-cookie-accept-decline
```

Or you can include it through the browser at the bottom of your page:

`<script src="https://unpkg.com/vue-cookie-accept-decline"></script>`

### About

We needed a component to show a privacy banners on pages - came across the awesome [vue-cookie-law](https://github.com/apertureless/vue-cookie-law) by [apertureless](https://github.com/apertureless) and it was almost what was needed, except we needed to track the option of an opt-out/decline which seemed a bit out of scope for that project - so `vue-cookie-accept-decline` is the result.

The big difference here is that `vue-cookie-accept-decline` allows the user to decline the text on the banner - this is important because you may want to *not* uses cookies in your app if they have declined the oppurtunity to be tracked.

When the  decline or accept buttons are clicked, they will emit the events `clickedAccept` and `clickedDeclined` respectively. Also, on creation, the component will emit a `status` event with a value of the current setting, `null` for nothing set, `accept` for an accepted banner, and `decline` for a declined banner. You can listen to this event on the component and do something like disable cookies if you see they have declined the banner.

### Usage Example

```html
<vue-cookie-accept-decline
    :debug="false"
    :position="'bottom'"
    :transitionName="'slideFromBottom'"
    @status="cookieStatus"
    @clickedAccept="cookieClickedAccept"
    @clickedDecline="cookieClickedDecline">
    <div slot="message">
        We use cookies to ensure you get the best experience on our website.
        <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a>
    </div>
</vue-cookie-accept-decline>
```

### Props

| prop           | type    | default         | possible values                     | description                                                          |
|----------------|---------|-----------------|-------------------------------------|----------------------------------------------------------------------|
| debug          | boolean | false           | true, false                         | If true, the cookie is never saved, only the events will be emitted. |
| position       | string  | bottom          | bottom, top                         | Position of the banner                                               |
| transitionName | string  | slideFromBottom | slideFromBottom, slideFromTop, fade | Banner animation type                                                |

### Events

| event          | value                     | description                                                   |
|----------------|---------------------------|---------------------------------------------------------------|
| status         | 'accept', 'decline', null | Event will be emitted when component is created.             |
| clickedAccept  | none                      | Event will be emitted when accept is clicked on the banner.   |
| clickedDecline | none                      | Event will be emitted when declined is clicked on the banner. |

### Message Slot

There is a slot for your own custom `message`, this is good for providing your own link of whatever type you want. If you don't use the slot, the default `message` will be: `We use cookies to ensure you get the best experience on our website.`.

### SASS Structure

```sass
.cookie {
    &--bottom {
    }

    &--top {
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
```

### Development

``` bash
# install dependencies
npm install

# serve with hot reload
npm run watch

# build demo page
npm run build:example

# build
npm run build

# publish to npm
npm version patch
npm publish
```

### Thank You

Thank you [apertureless](https://github.com/apertureless) for [vue-cookie-law](https://github.com/apertureless/vue-cookie-law). Go check out `vue-cookie-law` and his other projects. Also, thank you [insites](https://github.com/insites) for [cookieconsent](https://github.com/insites/cookieconsent).

### Other

Go ahead and fork the project! Submit an issue if needed. Have fun!

### License

[MIT](http://opensource.org/licenses/MIT)

Packaged with a mixture of [vue-lib-template](https://github.com/biigpongsatorn/vue-lib-template) and [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup).