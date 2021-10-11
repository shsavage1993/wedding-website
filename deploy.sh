# deploy.sh
#!/bin/bash

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" == "dev" ]]; then
  npm run build:dev && firebase deploy -P dev
elif [[ "$BRANCH" == "main" ]]; then
  npm run build:prod && firebase deploy -P prod
else
  echo "Not in 'dev' or 'main' branch. Aborting...";
fi