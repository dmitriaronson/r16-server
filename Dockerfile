FROM node:9.11.2
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
CMD [ "npm", "start" ]
