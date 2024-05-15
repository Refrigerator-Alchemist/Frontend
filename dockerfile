FROM node

COPY . .

RUN npm i

RUN npm run build

RUN npm install -g serve

CMD [ "serve","-s","build" ]

EXPOSE 3000