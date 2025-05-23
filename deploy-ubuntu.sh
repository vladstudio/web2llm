#!/bin/bash

# Deployment script for web2llm on Ubuntu server
# This script installs dependencies and sets up the environment

set -e  # Exit on any error

echo "🚀 Setting up web2llm on Ubuntu server..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Install system dependencies for Playwright
echo "📦 Installing system dependencies for Playwright..."
sudo apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libgtk-3-0 \
    libatspi2.0-0 \
    libxss1 \
    libasound2

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Install Playwright browsers
echo "🎭 Installing Playwright browsers..."
npx playwright install chromium

# Install system dependencies for the browsers
echo "📦 Installing Playwright system dependencies..."
npx playwright install-deps chromium

# Run tests to verify everything works
echo "🧪 Running tests to verify installation..."
npm test

echo "✅ Setup complete! You can now run the application with:"
echo "   node web2llm.js -u <URL> [options]"
echo ""
echo "Example usage:"
echo "   node web2llm.js -u https://example.com -o output.md"