#!/bin/bash

# https://github.com/Anik200/dotfiles/blob/main/.config/wofi/wofi.sh

WALLPAPER_DIR="$HOME/.config/wallpapers"

# List files in the wallpaper directory and send them to wofi.
SELECTED=$(ls "$WALLPAPER_DIR"/*.{png,jpg,jpeg,gif,webp} 2>/dev/null | xargs -n 1 basename | wofi --dmenu --prompt "Select a wallpaper:" -W 300 -H 300)

# Check if a selection was made.
if [ -n "$SELECTED" ]; then
    exec $HOME/.config/hypr/scripts/change_wallpaper.sh "$WALLPAPER_DIR/$SELECTED"
fi
