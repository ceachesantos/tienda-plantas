const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    rol: {
        type: String,
        required: true
    },
    /*fechaCreacion: {
        type: Date,
        default: Date.now()
    }*/
});

module.exports = mongoose.model('Usuario', UsuarioSchema);