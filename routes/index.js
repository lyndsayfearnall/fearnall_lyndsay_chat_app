const express = require('express');
const router = express.Router();
const path = require('path'); //path module provides utilities for working with file and directory paths, must be accessed with const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

module.exports = router;
