FROM node:latest

WORKDIR /
ADD . /
RUN npm run setup
EXPOSE 5000
CMD ["npm", "start"]