const app = require('./src/app');
require('dotenv').config();

app.listen(3000, () => {
  console.log('Server started ad localhost:3000');
});
