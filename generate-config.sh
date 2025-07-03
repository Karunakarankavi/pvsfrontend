#!/bin/bash

# Ensure env vars are loaded
if [ -z "$COGNITO_CLIENT_ID" ] || [ -z "$COGNITO_CLIENT_SECRET" ]; then
  echo "❌ Error: Missing env vars. Run 'source .env' first."
  exit 1
fi

# Generate the config file
echo "✅ Creating src/assets/config.json..."
cat <<EOF > src/assets/config.json
{
  "cognitoClientId": "$COGNITO_CLIENT_ID",
  "cognitoClientSecret": "$COGNITO_CLIENT_SECRET"
}
EOF

echo "✅ config.json generated successfully."

