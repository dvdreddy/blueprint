#!/bin/bash

PREFIX=""

if  test -z "$1"
then
    echo "Supply project directory"
fi

OLIV_DIR="$1"

if [ "$2" = "--shaded" ]
then
    PREFIX="shaded-"
fi

cp packages/datetime/lib/css/blueprint-datetime.css ${OLIV_DIR}/resources/chrome_extension/css/${PREFIX}blueprint-datetime.css
cp packages/select/lib/css/blueprint-select.css  ${OLIV_DIR}/resources/chrome_extension/css/${PREFIX}blueprint-select.css
cp packages/core/lib/css/blueprint.css  ${OLIV_DIR}/resources/chrome_extension/css/${PREFIX}blueprint.css
cp packages/icons/lib/css/blueprint-icons.css ${OLIV_DIR}/resources/chrome_extension/css/${PREFIX}blueprint-icons.css
cp packages/popover2/lib/css/blueprint-popover2.css  ${OLIV_DIR}/resources/chrome_extension/css/${PREFIX}blueprint-popover2.css
cp packages/datetime2/lib/css/blueprint-datetime2.css ${OLIV_DIR}/resources/chrome_extension/css/${PREFIX}blueprint-datetime2.css
