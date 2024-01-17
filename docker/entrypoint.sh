#!/bin/sh

# Write environment variable to /usr/share/nginx/html/config.json
echo "{\"apiUrl\": \"$BASE_URL\"}" > /usr/share/nginx/html/config/config.json

# Start nginx
nginx -g 'daemon off;'