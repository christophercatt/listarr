FROM node:latest

WORKDIR /
ADD . /
RUN npm run setup
RUN mkdir -p /server/config
EXPOSE 5000
CMD ["npm", "start"]