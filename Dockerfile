FROM ubuntu:latest

# Install Node.js and dependencies
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install nodejs -yq 

# Copy and Setup App
WORKDIR /app
COPY . /app
RUN npm run setup

# Add User/Group and make User owner of the root directory
RUN groupadd -r listarr \
    && useradd -r -s /bin/false -g listarr listarr \
    && chown -R listarr:listarr /app \

EXPOSE 5000

# Change User to created User
USER listarr

RUN mkdir -p /app/server/conf

CMD ["npm", "start"]