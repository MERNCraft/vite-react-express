#!/bin/bash

# Define the paths for dist and the target directory
DIST_DIR="./frontend/dist/"
PUBLIC_DIR="./backend/public/"
ASSETS="$PUBLIC_DIR"assets/

# Ensure the script is run from the correct location
if [ ! -d "$DIST_DIR" ]; then
  echo "Error: $DIST_DIR does not exist. Please make sure 'vite build' has been run."
  exit 1
fi

if [ ! -d "$PUBLIC_DIR" ]; then
  echo "Error: $PUBLIC_DIR does not exist. Please make sure the backend directory is set up correctly."
  exit 1
fi

# Copy everything from dist/ to ../backend/public using rsync
echo "About to sync files from $DIST_DIR to $PUBLIC_DIR"

# echo "These files in the $ASSETS folder may be out of date:"
# ls "$ASSETS"
# read -p "Do you want to delete them ([y]es or [N]o): " -n 1 -r
# echo    # (optional) move to a new line
# if [[ $REPLY =~ ^[Yy]$ ]]
# then
#     # do dangerous stuff
#     echo "Deleting the files..."
#     rm -rf "$ASSETS"
# else
#     echo "No files were deleted."
# fi

rsync -a --verbose "$DIST_DIR/" "$PUBLIC_DIR/"
echo "Files successfully synced."