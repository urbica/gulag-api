const app = require('./src/app');
require('dotenv').config();

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
