const express = require('express');
const mongoose = require('mongoose').default;
const { errors } = require('celebrate');
const routers = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// слушаем 3000 порт
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

// создание приложения методом express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routers);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

// подключаемся к серверу mongo
async function init() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
  console.log('соединение с базой установлено');

  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}

init();
