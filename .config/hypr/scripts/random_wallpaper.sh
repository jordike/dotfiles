#!/bin/bash

DIR=$HOME/.config/wallpapers/
PICS=($(ls ${DIR}))

RANDOMPICS=${PICS[ $RANDOM % ${#PICS[@]} ]}

exec $HOME/.config/hypr/scripts/change_wallpaper.sh "${DIR}/${RANDOMPICS}"
