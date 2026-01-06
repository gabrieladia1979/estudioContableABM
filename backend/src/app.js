const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contact');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 10 }));

app.use('/api', contactRoutes);

app.get('/', (req, res) => res.send('Estudio backend running'));

module.exports = app;
