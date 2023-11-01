require('dotenv').config();

const { PORT, MONGO_URL } = process.env;

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose').default;
const { errors } = require('celebrate');
const routers = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// создание приложения методом express
const app = express();

app.use(cors());
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
