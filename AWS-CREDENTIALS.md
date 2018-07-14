# Using AWS CLI with 2FA

Get your your temp credentials using the following command:

```shell
aws --profile anoact sts get-session-token --serial-number arn-of-the-mfa-device --token-code code-from-token
```

You'll receive the following response:

```shell
{
  "Credentials": {
    "SecretAccessKey": "secret-access-key",
    "SessionToken": "temporary-session-token",
    "Expiration": "expiration-date-time",
    "AccessKeyId": "access-key-id"
  }
}
```

Use it in your current shell (secure way):

```shell
export AWS_ACCESS_KEY_ID=<Access-Key-as-in-Previous-Output>
export AWS_SECRET_ACCESS_KEY=<Secret-Access-Key-as-in-Previous-Output>
export AWS_SESSION_TOKEN=<Session-Token-as-in-Previous-Output>
```
