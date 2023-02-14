FROM node:16-alpine

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install
RUN npm install vite --save-dev
RUN npm install react-scripts@5.0.1

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]