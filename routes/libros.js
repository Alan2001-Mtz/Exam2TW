const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.listarLibros);
router.get('/nuevo', libroController.mostrarFormularioNuevo);
router.post('/', libroController.crearLibro);
router.get('/:id/editar', libroController.mostrarFormularioEditar);
router.put('/:id', libroController.actualizarLibro);
router.delete('/:id/eliminar', libroController.eliminarLibro);
router.get('/:id', libroController.obtenerLibroPorId);

module.exports = router;
