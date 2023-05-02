// Rutas para compra
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// api/compras
router.post('/', compraController.crearCompra);
router.get('/', compraController.obtenerCompras);
router.put('/:id', compraController.actualizarCompra);
router.get('/:id', compraController.obtenerCompra);
router.delete('/:id', compraController.eliminarCompra);

module.exports = router;