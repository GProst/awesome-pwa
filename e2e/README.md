# Construction of E2E tests framework

1) Each test contains static properties and variable capabilities. Static properties
are properties like `id`, `type`, `description`. Capabilities are `browser`,
`browserVersion`, `os`, `windowSize`. Each test can run against many capabilities.

2) CLI accepts arguments to create a filter that'll be used to run limited amount
of tests. Example of arguments:
```
--browsers Chrome:67.0 --OSs OS---X:High---Sierra --types other --priorities 4,3,1
```

3) If `--ids` argument is provided, only tests with these ids will be invoked, otherwise
all tests are invoked (if match other filter params).

4) Currently tests called each after another. In the future there maybe changes.

5) Tests are invoked in order of priority. Test with lower priority value come first.
Priority should be assigned in regards to execution speed of that test. If test is executed
quickly then it should have low priority value to be executed before other tests.
The other option is to treat priority as a `group`. So that you can partition tests
in groups (nameless groups).

## Environment variables:

* APP_URL - url of the app to open by WebDriver, defaults to `'https://dwgo2lfl43tk4.cloudfront.net/'`
* CODEBUILD_RESOLVED_SOURCE_VERSION - used to get Git commit SHA
* CODEBUILD_BUILD_ID - used to get AWS CodeDeploy build ID
* BROWSERSTACK_USER - used to get BrowserStack username
* BROWSERSTACK_KEY - used to get BrowserStack key

