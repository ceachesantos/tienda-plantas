const mongoose = require('mongoose');

const CompraSchema = mongoose.Schema({
    IDarticulo: {
        type: String,
        required: true
    },
    IDcliente: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    nombreComprador: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    /*fechaCreacion: {
        type: Date,
        default: Date.now()
    }*/
});

module.exports = mongoose.model('Compra', CompraSchema);