const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

router.get('/', function(req, res, next) {
  res.render('signin', {title: 'Look4Makan'});
});

module.exports = router;