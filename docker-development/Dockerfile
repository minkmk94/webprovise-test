FROM node:16-alpine

EXPOSE 3001

WORKDIR /home/node/api

RUN chown -R node:node /home/node/api

COPY --chown=node:node . .

RUN yarn --pure-lockfile

USER node

CMD ["node", "dist/main"]