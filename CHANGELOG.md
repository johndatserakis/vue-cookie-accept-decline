# CHANGELOG.md

## 3.0.0 (2018-10-23)

- Added new default display option of `floating`.
- Added new required `elementId` property to allow for multiple instances of `vue-cookie-accept-decline` on the same page.
- Exposed a `removeCookie` method that can be used to clear the cookie the component creates. Also exposed the `init` method to allow devs to show the panel back to the user if they remove the cookie using `removeCookie`.
- Updated readme to account for these new changes.
- Added unit tests for the component.

## 2.0.2 (2018-10-10)

- Decreased box-shadow opacity and adjusted border-top color.