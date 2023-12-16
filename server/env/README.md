# Secrets Managment 101

1. Ensure you have all the secrets you want on the '.env' file, check the syntax of the file in the '.env.sample' file.

2. If you have files (old secrets) in the '/env' folder run the command 'bash secrets.sh remove'.

3. Run the command 'bash secrets.sh create' to create files to each secret individually on the '/env' folder.

4. Use the secrets on the code with the name given to each one on the 'docker-compose.yml' file.