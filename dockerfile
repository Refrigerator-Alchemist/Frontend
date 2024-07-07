FROM node

WORKDIR /app

COPY . .

RUN npm install -g corepack
RUN corepack enable

RUN yarn set version berry
RUN yarn set version 4.3.1

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
