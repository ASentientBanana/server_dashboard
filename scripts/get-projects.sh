#! /usr/bin/env bash

token=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
user_name=ASentientBanana

curl -H "Authorization: token $token" \
    https://api.github.com/user/repos | jq > response.json


