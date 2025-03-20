#!/bin/bash

# Clean up any previous builds
rm -rf build

# Install dependencies (if needed)
npm install

# Build the production bundle
npm run build

echo "Build completed successfully! Ready for Netlify deployment."
echo "To deploy manually, install Netlify CLI and run: netlify deploy" 