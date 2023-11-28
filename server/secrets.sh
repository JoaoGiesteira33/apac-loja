#! /usr/bin bash

# Define the list of keys to process
keys=("MONGO_CLUSTER" "MONGO_DB_NAME" "MONGO_USER" "MONGO_PASSWORD" "AUTH_KEY")

secrets_folder=env/

action="$1" # Get the action parameter: create or remove

mkdir -p -m=700 $secrets_folder # Create the secrets folder if it doesn't exist

if [ "$action" == "create" ]; then
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
    rm -rf $secrets_folder*
    rmdir -p $secrets_folder
else
    echo "Please provide 'create' or 'remove' as an argument."
fi




