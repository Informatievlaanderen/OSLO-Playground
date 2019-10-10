FROM node:8
# Create app directory
WORKDIR /usr/src/app

ARG NPM_TOKEN
COPY .npmrc .npmrc

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
RUN rm -f .npmrc

# Bundle app source
COPY . .
RUN npm run-script build

EXPOSE 3000
CMD [ "node", "app.js"]