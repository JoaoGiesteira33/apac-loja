#! /usr/bin bash

# Define the list of keys to process
keys=("MONGO_CLUSTER" "MONGO_DB_NAME" "MONGO_USER" "MONGO_PASSWORD" "AUTH_KEY")

secrets_folder=env/

action="$1" # Get the action parameter: create or remove

if [ "$action" == "create" ]; then
    mkdir -p -m=700 $secrets_folder # Create the secrets folder if it doesn't exist
    while IFS='=' read -r key value
    do
        if [[ " ${keys[@]} " =~ " $key " ]]; then
            touch $secrets_folder$key.txt
            chmod 600 $secrets_folder$key.txt
            printf $value >> $secrets_folder$key.txt
        else
            echo "Ignoring unrecognized key: $key"
        fi
    done < .env
elif [ "$action" == "remove" ]; then
    # Remove the secrets files just with the keys names
    for key in "${keys[@]}"
    do
        rm -f $secrets_folder$key.txt
    done
else
    echo "Please provide 'create' or 'remove' as an argument."
fi




