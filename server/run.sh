#! /usr/bin bash

echo "  [Swarm initialization]"
docker swarm init

echo "  [Stop deployment]"
docker compose down

echo "  [Delete api image]"
docker image rm apac_api_img -f
echo "  [Delete auth image]"
docker image rm apac_auth_img -f

echo "  [Building image 'apac_api_img' and put files inside]"
docker build ./api -t apac_api_img
docker create --name temp_container_api apac_api_img
docker cp api temp_container_api:/code/
docker cp utils temp_container_api:/code/
docker commit temp_container_api apac_api_img
docker rm temp_container_api -f


echo "  [Building image 'apac_auth_img' and put files inside]"
docker build ./auth -t apac_auth_img
docker create --name temp_container_auth apac_auth_img
docker cp auth temp_container_auth:/code/
docker cp utils temp_container_auth:/code/
docker commit temp_container_auth apac_auth_img
docker rm temp_container_auth -f

echo "  [Start deployment]"
docker compose up -d
