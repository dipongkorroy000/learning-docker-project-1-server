FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# it's anonymous volume , 2nd-> named volume
# VOLUME [ "/app/logs" ]

EXPOSE 5000

CMD ["npm", "run", "dev"]