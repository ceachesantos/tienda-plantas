const Compra = require("../models/Compra");


exports.crearCompra = async (req, res) => {

    try {
        let compra;

        // Creamos nuestro compra
        compra = new Compra(req.body);

        await compra.save();
        res.send(compra);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCompras = async (req, res) => {

    try {

        const compras = await Compra.find();
        res.json(compras)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarCompra = async (req, res) => {

    try {
        const { IDarticulo, IDcliente, cantidad, nombreComprador, direccion} = req.body;
        let compra = await Compra.findById(req.params.id);

        if(!compra) {
            res.status(404).json({ msg: 'No existe la compra' })
        }

        compra.IDarticulo = IDarticulo;
        compra.IDcliente = IDcliente;
        compra.cantidad = cantidad;
        compra.nombreComprador = nombreComprador;
        compra.direccion = direccion;

        compra = await Compra.findOneAndUpdate({ _id: req.params.id },compra, { new: true} )
        res.json(compra);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerCompra = async (req, res) => {

    try {
        let compra = await Compra.findById(req.params.id);

        if(!compra) {
            res.status(404).json({ msg: 'No existe el compra' })
        }

        else{
            res.json(compra);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCompra = async (req, res) => {

    try {
        let compra = await Compra.findById(req.params.id);

        if(!compra) {
            res.status(404).json({ msg: 'No existe el compra' })
        }
       
        await Compra.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'compra eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}