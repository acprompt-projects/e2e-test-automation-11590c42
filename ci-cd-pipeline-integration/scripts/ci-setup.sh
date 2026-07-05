#!/usr/bin/env bash
set -euo pipefail

echo "=== CI Environment Setup ==="

if [ -z "${CI:-}" ]; then
  echo "Warning: Not running in CI environment. Some features may differ."
fi

echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

echo "Installing dependencies..."
npm ci

echo "Installing Playwright browsers..."
npx playwright install --with-deps chromium

echo "=== Setup Complete ==="