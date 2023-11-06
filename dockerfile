FROM node:18

ENV TZ=America/Sao_Paulo

ENV LANG pt_BR.UTF-8

ENV LC_ALL pt_BR.UTF-8

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && apt-get install -y locales && locale-gen $LANG

WORKDIR /app

COPY ./package*.json ./

COPY . .

RUN npm i