
require('dotenv/config');
const express = require('express');

const db = require('../database');
const staticMiddleware = require('../static-middleware');
const sessionMiddleware = require('../session-middleware');

const router = express.Router();

router.use(staticMiddleware);
router.use(sessionMiddleware);

router.use(express.json());

router.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

module.exports = router;
