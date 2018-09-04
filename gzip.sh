#!/usr/bin/env bash

find ./dist -type f | while read f; do gzip -9 "$f"; done
find ./dist -type f | while read f; do mv "$f" "$(dirname $f)/`basename $f .gz`"; done
