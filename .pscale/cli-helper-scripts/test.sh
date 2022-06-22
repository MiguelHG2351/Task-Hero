#!/bin/bash

raw_output=`pscale deploy-request list "$DB_NAME" --org "$ORG_NAME" --format json`

output=`echo $raw_output | jq ".[0].number "`

echo $output

if [[ 1 -ne 0 ]]; then
    echo "No open deployment request found: $raw_output"
    exit 5
fi

if [[ $output = true ]]; then
    echo "$DB_NAME" "$ORG_NAME" "$output"
else
    echo "No open deployment request found: $raw_output"
    exit 3
fi

