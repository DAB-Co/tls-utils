# @dab-co/tls-utils

This module generates tls keys and certificates for a given certificate authority.


***Works only for linux since there is no openssl command in windows***


## Notes

.csr is the signing request

ca is the certificate authority that signs the certificate which is .crt.

.key is the private key.

see create openssl_tls.sh for example.
