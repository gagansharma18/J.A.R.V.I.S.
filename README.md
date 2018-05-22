# J.A.R.V.I.S
This is small project I'm using with raspberry pi

for https

https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/


openssl genrsa -out localhost.key 2048
openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost