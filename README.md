# Priority Book PWA

## Install

```shell
yarn
```

## Build

1. Build web-workers assets

```shell
webpack
```

2. Build main app.js bundle

```
export BUILD_MAIN_BUNDLE=true && webpack
```

To build production version use `NODE_ENV = 'production'`

## Start dev server

1. Build web-workers assets (preferably in watch mode)

```
webpack --watch
```

2. Start dev server to bundle main app.js and serve it along with web workers from /dist folder

```shell
export BUILD_MAIN_BUNDLE=true && webpack-dev-server
```

## Env vars:

* APP_ENVIRONMENT - used as the env for Sentry, allowed values: `local`, `dev`, `stage`, `prod-l`, `prod-kira`
* APP_RELEASE - used as the release for Sentry (should be a git commit sha)
* UPLOAD_MAPS_TO_SENTRY - weather we should send source maps to Sentry or not
* SENTRY_AUTH_TOKEN - needed to upload artifacts to Sentry
* SENTRY_ORG - needed to upload artifacts to Sentry
* SENTRY_PROJECT - needed to upload artifacts to Sentry
* BUILD_MAIN_BUNDLE - if present main Bundle will be built (app.js), otherwise web-workers will be built
* ENABLE_SENTRY (development) - enables Sentry config (I don't use it because it makes a wrapper over console object)

## Global vars in JS:

* testThrowError - if equals `true` Authenticate component will throw an error inside componentDidUpdate
* testAnimationBaseDuration - sets base duration for an animation (most likely all animations, so unset it after you used it)

## Test attributes

* data-test-id
