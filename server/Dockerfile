# Use a Debian-based Node.js image
FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 8000
