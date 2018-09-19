See this for details: https://stackoverflow.com/a/43666288/6250385

ME: so first you create rootCA.pem that will be Root certificate you'll give permissions
ME: then you create another .crt file for domain that you want and this .crt will refer to our rootCA.pem

ME: WARNING: I modified create_certificate_for_domain.sh so that the resulting files have static names

ME: Below steps from SO just in case

# create a root authority cert
./create_root_cert_and_key.sh

# create a wildcard cert for mysite.com
./create_certificate_for_domain.sh mysite.com

# or create a cert for www.mysite.com, no wildcards
./create_certificate_for_domain.sh www.mysite.com www.mysite.com


To allow the self signed certificates to be FULLY trusted in Chrome and Safari, you need to import a new certificate authority into your Mac.
To do so follow these instructions, or the more detailed instructions on this general process on the mitmproxy website:

Open Keychain Access
Choose "System" in the "Keychains" list
Choose "Certificates" in the "Category" list
Choose "File | Import Items..."
Browse to the file created above, "rootCA.pem", select it, and click "Open"
Select your newly imported certificate in the "Certificates" list.
Click the "i" button, or right click on your certificate, and choose "Get Info"
Expand the "Trust" option
Change "When using this certificate" to "Always Trust"
Close the dialog, and you'll be prompted for your password.
Close and reopen any tabs that are using your target domain, and it'll be loaded securely!
