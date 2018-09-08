# Priority Book PWA

## Install

```shell
yarn
```

## Build

```shell
yarn run build
```

To build production version use `NODE_ENV = 'production'`

## Start dev server

```shell
yarn start
```

## Env vars:

* APP_ENVIRONMENT - used as the env for Sentry, allowed values: `local`, `dev`, `stage`, `prod-l`, `prod-kira`
* APP_RELEASE - used as the release for Sentry (should be a git commit sha)
* UPLOAD_MAPS_TO_SENTRY - weather we should send source maps to Sentry or not
* SENTRY_AUTH_TOKEN - needed to upload artifacts to Sentry
* SENTRY_ORG - needed to upload artifacts to Sentry
* SENTRY_PROJECT - needed to upload artifacts to Sentry

## Global vars in JS:

* testThrowError - if equals `true` Authenticate component will throw an error inside componentDidUpdate
* testAnimationBaseDuration - sets base duration for an animation (most likely all animations, so unset it after you used it)

## Test attributes

* data-test-id
