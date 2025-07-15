FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
  ffmpeg \
  python3 \
  git \
  curl \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "index.js"]