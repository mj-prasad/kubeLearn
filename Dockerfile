# Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY app/package*.json ./
RUN npm install --only=production

COPY app/ ./

# Runner stage
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

USER node

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "server.js"]
