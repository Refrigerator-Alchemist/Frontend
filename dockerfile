FROM node

COPY ./build .

EXPOSE 3000

CMD ["yarn", "start"]
