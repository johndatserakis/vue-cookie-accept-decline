# CHANGELOG.md

## 4.0.0 (2018-11-02)

- Adjusted build output - there will now be an additional `css` file that needs to be imported along with the `js`. This allows the `css` to be handled nicely by webpack or your app's build system.

## 3.0.2 (2018-10-24)

- Fixed button bug on some older iPads.

## 3.0.1 (2018-10-23)

- Added Codesandbox example. Updated readme.

## 3.0.0 (2018-10-23)

- Added new default display option of `floating`.
- Added new required `elementId` property to allow for multiple instances of `vue-cookie-accept-decline` on the same page.
- Exposed a `removeCookie` method that can be used to clear the cookie the component creates. Also exposed the `init` method to allow devs to show the panel back to the user if they remove the cookie using `removeCookie`.
- Updated readme to account for these new changes.
- Added unit tests for the component.

## 2.0.2 (2018-10-10)

- Decreased box-shadow opacity and adjusted border-top color.