FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

#sudo docker build -t kasiawinkler/react-app .
#sudo docker run --name react-app -p 3100:3000 -d kasiawinkler/react-app
