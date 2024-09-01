# Change wallpaper using swww.
swww img $1 --transition-fps 60 --transition-type any --transition-duration 1

# Change wallpaper used by hyprlock.
cp $1 ~/.config/hyprlock/wallpaper

# Update pywal colors.
wal -i $1
