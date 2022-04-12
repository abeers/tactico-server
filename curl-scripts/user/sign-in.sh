#!/bin/bash

curl "http://localhost:4741/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "identifier": "'"${IDENTIFIER}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo