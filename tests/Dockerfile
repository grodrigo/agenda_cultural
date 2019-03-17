FROM cypress/base:10

RUN wget -q -O - https://www.mongodb.org/static/pgp/server-4.0.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.0 main" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list

RUN apt-get update && apt-get install -y \
	mongodb-org


ADD . /home/node/tests
WORKDIR /home/node/tests
RUN npm install

#RUN npm install cypress --save-dev
#RUN $(npm bin)/cypress verify
#RUN $(npm bin)/cypress run
#RUN bash -c 'npm i cypress --save-dev'
#RUN npm install mongoose --save-dev

CMD ["npm", "test"]


#node_modules/.bin/cypress open

# Para correr en local:
# probar:
# node_modules/.bin/cypress verify
# si se queda tildada fijarse propietario y grupo en
# /home/{username}/.cache/Cypress/
# lo mismo en 
# /home/{username}/.config/Cypress
# en ubuntu se cambiarian haciendo
# sudo chown -R {username:username} /home/{username}/.config/Cypress

#RUN curl https://www.mongodb.org/static/pgp/server-4.0.asc | sudo apt-key add -


