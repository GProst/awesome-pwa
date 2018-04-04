#!/usr/bin/env bash

find ./public -type f | while read f; do gzip -9 "$f"; done
find ./public -type f | while read f; do mv "$f" "$(dirname $f)/`basename $f .gz`"; done
