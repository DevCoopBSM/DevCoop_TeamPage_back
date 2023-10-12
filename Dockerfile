FROM node:20.7.0

WORKDIR /

COPY package*.json ./
COPY package-lock.json .

RUN npm install


COPY . .

EXPOSE 5000
CMD ["npm", "run backend"]
