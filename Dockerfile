FROM node:latest

WORKDIR /
ADD .
RUN npm setup
EXPOSE 5000
CMD ["npm", "start"]