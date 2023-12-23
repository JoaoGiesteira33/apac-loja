#! /usr/bin bash

echo "  [Swarm initialization]"
docker swarm leave

echo "  [Stop deployment]"
docker compose down

echo "  [Delete api image]"
docker image rm apac_api_img -f
echo "  [Delete auth image]"
docker image rm apac_auth_img -f
