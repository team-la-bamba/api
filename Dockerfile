FROM jitesoft/node:latest

COPY ./ /app
WORKDIR /app
RUN npm ci \
    npm run build

ENTRYPOINT ["node"]
CMD ["dist/server.js"]
