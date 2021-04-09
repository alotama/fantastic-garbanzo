content=$(curl -X POST -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' 'https://api.mercadolibre.com/oauth/token' -d 'grant_type=refresh_token' -d 'client_id=8128027592033570' -d 'client_secret=rI6wdow95Pfk3TASVcjYvF35NmHSmS6W' -d 'refresh_token=TG-6066ac41e8d15c00084df519-174564631') 
username=$( jq -r  '.access_token' <<< "${content}" )

export ACCESS_TOKEN=${username}

envsubst '${ACCESS_TOKEN}' < .env-template > .env