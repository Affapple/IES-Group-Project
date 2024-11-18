FROM node:22.11-alpine
WORKDIR /app
COPY ./carbox . 
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev", "--" , "--host"]
