# Create set-env.sh file using this template
#!/usr/bin/env bash

export BROWSERSTACK_USER=german
export BROWSERSTACK_KEY=blablablabla

# use '---' for a white space
export E2E_TESTS_PARAMS="--browsers Chrome:67.0 --OSs OS---X:High---Sierra --types other --priorities 4,3,1"
