const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    flores: {
        type: String,
        required: true
    },
    frutal: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    /*fechaCreacion: {
        type: Date,
        default: Date.now()
    }*/
});

module.exports = mongoose.model('Producto', ProductoSchema);