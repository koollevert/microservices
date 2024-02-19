FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]




# FROM redis:latest


# LABEL maintainer="Joshua Mumo joshuambiyu002@gmail.com"


# EXPOSE 6379


# CMD ["redis-server"]
