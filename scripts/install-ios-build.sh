#!/usr/bin/env bash
# Download the latest successful iOS simulator build from GitHub Actions
# and install it on the booted iOS simulator.
#
# Usage:
#   scripts/install-ios-build.sh [workflow-file] [artifact-name]
#
# Defaults:
#   workflow-file = ios-simulator-build.yml   (or eas-local-build.yml)
#   artifact-name = ios-simulator-app         (or eas-local-ios-development-simulator)
#
# Requires: GitHub CLI (`brew install gh`, then `gh auth login`) and Xcode simulators.

set -euo pipefail

WORKFLOW="${1:-ios-simulator-build.yml}"
ARTIFACT="${2:-ios-simulator-app}"
BUNDLE_ID="com.sample.app"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI not found. Install it with: brew install gh && gh auth login" >&2
  exit 1
fi

# Download into a fresh, empty directory. Never run anything from it.
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

echo "Finding latest successful run of $WORKFLOW..."
RUN_ID="$(gh run list --workflow "$WORKFLOW" --status success --limit 1 --json databaseId --jq '.[0].databaseId')"
if [ -z "$RUN_ID" ] || [ "$RUN_ID" = "null" ]; then
  echo "No successful run found for $WORKFLOW." >&2
  exit 1
fi

echo "Downloading artifact '$ARTIFACT' from run $RUN_ID..."
gh run download "$RUN_ID" --name "$ARTIFACT" --dir "$WORK_DIR/download"

# gh already unzips the artifact; the payload is a .zip (xcodebuild) or .tar.gz (EAS)
mkdir -p "$WORK_DIR/extracted"
for f in "$WORK_DIR"/download/*; do
  case "$f" in
    *.zip) unzip -q "$f" -d "$WORK_DIR/extracted" ;;
    *.tar.gz) tar -xzf "$f" -C "$WORK_DIR/extracted" ;;
  esac
done

APP_PATH="$(find "$WORK_DIR/extracted" -maxdepth 3 -name '*.app' -type d | head -n 1)"
if [ -z "$APP_PATH" ]; then
  echo "No .app found in the artifact." >&2
  exit 1
fi

# Boot a simulator if none is running
if ! xcrun simctl list devices booted | grep -q Booted; then
  echo "No booted simulator. Booting the first available iPhone..."
  UDID="$(xcrun simctl list devices available | grep -m1 iPhone | grep -oE '[0-9A-F-]{36}')"
  xcrun simctl boot "$UDID"
  open -a Simulator
fi

echo "Installing $(basename "$APP_PATH")..."
xcrun simctl install booted "$APP_PATH"
xcrun simctl launch booted "$BUNDLE_ID" >/dev/null || true

echo "Done. Start Metro with: bunx expo start --dev-client"
