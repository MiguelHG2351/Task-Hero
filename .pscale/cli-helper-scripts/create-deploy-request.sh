#!/bin/bash

. use-pscale-docker-image.sh
. authenticate-ps.sh
. set-db-and-org-and-branch-name.sh
. ps-create-helper-functions.sh

# last deploy request
# raw_output=`pscale deploy-request list "$DB_NAME" --org "$ORG_NAME" --format json`
# if [ $? -ne 0 ]; then
#     echo "Error: pscale deploy-branch list returned non-zero exit code $?: $raw_output"
#     exit 1
# fi

# output=`echo $raw_output | jq ".[0].number "`

create-deploy-request "${DB_NAME}" "${BRANCH_NAME}" "${ORG_NAME}"
# Diff changes
# deploy_request_number=$output
# create-diff-for-ci "$DB_NAME" "$ORG_NAME" "$deploy_request_number" "$BRANCH_NAME" "$refresh_schema"
# STRLENGTH=`echo -n $? | wc -m`
# if [ $STRLENGTH -ne 0 ]; then
#     echo "No hay diferencias en la base de datos"
# else
#     echo "Hay diferencias en la base de datos"
# fi
