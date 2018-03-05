const app = require('./src/app');
require('dotenv').config();

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
