#!/bin/bash

if [ $1 -gt 1 ]; then
    echo "$1 failed attempts";
fi

if [ $1 -eq 1 ]; then
    echo "$1 failed attempt";
fi
