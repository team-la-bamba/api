FROM jitesoft/node:latest AS base

COPY ./ /app
WORKDIR /app
RUN npm ci \
    npm run build

FROM jitesoft/node-base:latest
COPY --from=base /app /app
WORKDIR /app

ENTRYPOINT ["node"]
CMD ["dist/server.js"]
