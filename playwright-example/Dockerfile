FROM node:26

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx playwright install --with-deps firefox

CMD ["npm", "run", "playwright:test:headless:firefox"]