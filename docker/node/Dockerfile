# 開発用
FROM node:20

WORKDIR /var/www/html

# npmパッケージをインストール
COPY ./src/package*.json ./
RUN npm install --legacy-peer-deps

# CMDでdevサーバー起動
CMD ["npm", "run", "dev"]
