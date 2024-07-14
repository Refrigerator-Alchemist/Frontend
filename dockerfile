FROM node

WORKDIR /app

COPY . .
COPY index.html .

RUN corepack enable
RUN yarn set version berry
RUN yarn install
RUN yarn add -D vite @vitejs/plugin-react
RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]
