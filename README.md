docker-compose up -d
Wait a moment, the database, backend and frontend take a while to setup

frontend with React:
localhost:3000

backend with Loopback:
localhost:3001

test e2e with Cypress:  
run it without docker 
'''
cd tests
npm install
node_modules/.bin/cypress open
'''

this will open chrome and run the tests.
There's a container wich run the tests for you but you won't see the browser running.  
Uncomment it in the docker-compose.yml to run it and see plain output. The main idea is to run e2e tests with CI
(update, this isn't working well right now, I need to review it)

There's a script to clean the database in tests/resetdb.sh run it with bash.  

**NOTES:**  
node_modules won't be visible from your host, if you want to copy the folder, uncomment once installed the line with node_modules in the container, this will mount the inside folder to your host.
