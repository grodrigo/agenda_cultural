# mongodb, Loopback and REACT with Cypress
Base sample application with Loopback api generator backend with mongo, React on the frontend and e2e testing with Cypress

## How to run it
Requirements:  
docker and docker-compose  

just clone the repo, and do  
```
docker-compose up -d
```
Wait a moment, the database, backend and frontend take a while to start-up  

### frontend with React:  
localhost:3000

### backend with Loopback:  
localhost:3001

### test e2e with Cypress:  
run it without docker 
'''
cd tests
npm install
node_modules/.bin/cypress open
'''
This will open chrome and run the tests.

-------------------------------------------
**NOTES:**  
**There's a script to clean the database in tests/resetdb.sh run it with bash.**  

-------------------------------------------
There's a container wich run the tests for you but you won't see your browser running.  
Uncomment it in the docker-compose.yml to run it and see plain output. The main idea is to run e2e tests with CI
(isn't working well right now, I need to review it)  

-------------------------------------------
node_modules folder won't be visible from your host, this is due the mounting order in docker and npm instalation, search on google for other approaches. If you want, once instaled in your container, you can copy node_modules to your host: uncomment the volume node_modules line comments in the containers.
