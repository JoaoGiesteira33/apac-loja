# Secrets Managment 101

**Your work directory is the `/server` aka `./../..`**

1. If you have files (old secrets) in the `/env` folder run the command `bash secrets.sh remove`.

2. Ensure that you have all the secrets you want on the `.env` file, check the syntax of the file in the `.env.sample` file.

3. Insert the name of secret on the `keys` list inside the `secrets.sh` file.

3. Run the command `bash secrets.sh create` to create files to each secret individually

4. Check that all files are created on the `/env` folder.

5. Insert the information of the secret on the `docker-compose.yml` file

6. Use the secrets on the code with the name given to each one on the `docker-compose.yml` file.


