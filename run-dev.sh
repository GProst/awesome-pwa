#!/usr/bin/env bash

export APP_ENVIRONMENT=local
export APP_RELEASE=local
export APP_ORIGIN=local
export DEV_SERVER=true
export BUILD_MAIN_BUNDLE=true
sudo -E yarn webpack-dev-server --port 443 --output-public-path="/" --host 0.0.0.0
