const mongoose = require('../bd/database');

const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anio_publicacion: Number,
  genero: String,
  edicion: Number
}, {
  collection: 'libros'
});

module.exports = mongoose.model('Libro', LibroSchema);
