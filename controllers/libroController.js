const Libro = require('../models/libro');

exports.listarLibros = async (req, res) => {
  const { mensaje, error, anio, edicion } = req.query;

  let filtro = {};
  if (anio) filtro.anio_publicacion = anio;
  if (edicion) filtro.edicion = edicion;

  const libros = await Libro.find(filtro).lean();
  res.render('libros/listaLibros', { libros, mensaje, error });
};

exports.mostrarFormularioNuevo = (req, res) => {
  res.render('libros/formularioLibro', { libro: {}, editar: false, error: null });
};

exports.crearLibro = async (req, res) => {
  try {
    await Libro.create(req.body);
    res.redirect('/libros?mensaje=Libro creado correctamente');
  } catch (err) {
    res.render('libros/formularioLibro', { libro: req.body, editar: false, error: 'Error al crear el libro' });
  }
};

exports.mostrarFormularioEditar = async (req, res) => {
  const libro = await Libro.findById(req.params.id).lean();
  res.render('libros/formularioLibro', { libro, editar: true, error: null });
};

exports.actualizarLibro = async (req, res) => {
  try {
    await Libro.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/libros?mensaje=Libro actualizado correctamente');
  } catch {
    const libro = await Libro.findById(req.params.id).lean();
    res.render('libros/formularioLibro', { libro, editar: true, error: 'Error al actualizar' });
  }
};

exports.eliminarLibro = async (req, res) => {
  await Libro.findByIdAndDelete(req.params.id);
  res.redirect('/libros?mensaje=Libro eliminado correctamente');
};

exports.obtenerLibroPorId = async (req, res) => {
  const libro = await Libro.findById(req.params.id).lean();
  if (!libro) return res.redirect('/libros?mensaje=Libro no encontrado');
  res.render('libros/detalleLibro', { libro });
};
