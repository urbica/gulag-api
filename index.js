const app = require('./src/app');
require('dotenv').config();

app.listen(3001, () => {
  console.log('Server started at localhost:3001');
});
