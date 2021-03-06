require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

console.log('coucou');

const mongoUri = `mongodb+srv://easydoor:DuMbPa$$W0rd@cluster0-l7v41.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('err connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  console.log('requireAuth', req);

  // @ts-ignore
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
