const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequilizie =  './config/connection.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequilizie.sequalize();

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
