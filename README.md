# PriorityBook web client

## Build

* Set `GPROST_ADMIN_DOMAIN` env var to set domain name that will be used
for setting cookies.
* Set `NODE_ENV` env var to `production` if you want to build
production version.
* Use `--output-public-path` CLI option to set public path for static
files.

Example:
```shell
npx cross-env NODE_ENV=production GPROST_ADMIN_DOMAIN="example.com" \
    npx webpack --output-public-path="https://example.com/static/"
```

## Start dev server

* Set `GPROST_ADMIN_DOMAIN` variable (read similar paragraph in
**Build** section above) or it will be set to `localhost`
* You can also use `NODE_ENV` env var to run in `production` mode
* You can also use other `webpack-dev-server` options
* Use `--hot` CLI option to enable `hot module replacement` mode

Example:
```shell
npx webpack-dev-server \
 --port 3000 --output-public-path="http://localhost:3000/" --hot
```