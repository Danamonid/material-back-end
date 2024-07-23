const express = require('express');
const dataRoutes = require('./routes/data');
// const data2Routes = require('./routes/data2');

const app = express();
const port = 4000;

app.use(dataRoutes);
// app.use(data2Routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
