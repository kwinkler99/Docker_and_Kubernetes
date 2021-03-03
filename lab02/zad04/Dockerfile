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

#WORKDIR ustala katalog w ktorym bedziemy wykonywac dzialania
#COPY kopiuje package*.json do ustalonego wyzej katalogu
#RUN instaluje package.json i tworzy node_modules dzieki czemu bedziemy mogli obslugiwac express na kontenerze
#COPY kopiuje plik express.js do nowo utworzonego server.js
#EXPOSE nasluchuje na porcie 8080
#CMD uruchamia aplikacje przez komende node server.js