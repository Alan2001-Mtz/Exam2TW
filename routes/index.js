const express = require('express');
const router = express.Router();
const librosRoutes = require('./libros');

router.get('/', (req, res) => res.redirect('/libros'));
router.use('/libros', librosRoutes);

module.exports = router;
