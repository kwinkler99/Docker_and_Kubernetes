FROM node:14
WORKDIR /usr/src/my_node_app
COPY package*.json ./
RUN npm install
COPY ./express.js ./server.js
EXPOSE 8080
CMD [ "node", "server.js" ]

#na komputerze
#tworzymy express.js
#tworzymy package.json -> uzupelniamy
#npm install

#polaczenie z dockerem
#sudo docker build -t node-test .
#sudo docker run -dp 4200:8080 node-test

#teraz mozemy przetestowac przez http get http://localhost:4200