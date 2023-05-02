import { Component } from '@angular/core';
import { CompraService } from 'src/app/services/compra.service';
import { Compra } from 'src/app/models/compra';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-compra',
  templateUrl: './crear-compra.component.html',
  styleUrls: ['./crear-compra.component.css'],
})
export class CrearCompraComponent {
  listProductos: Producto[] = [];
  compraForm: FormGroup;
  idCompra: string | null;
  idArticulo: string | null;
  titulo = 'Crear compra';
  cantidadDeseada: number;
  idCompraCreada: string | '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _compraService: CompraService,
    private aRouter: ActivatedRoute,
    private _productoService: ProductoService
  ) {
    this.compraForm = this.fb.group({
      IDarticulo: ['', Validators.required],
      IDcliente: ['', Validators.required],
      cantidad: ['', Validators.required],
      nombreComprador: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.idCompra = this.aRouter.snapshot.paramMap.get('idCompra');
    this.idArticulo = this.aRouter.snapshot.paramMap.get('idArticulo');
    this.cantidadDeseada = Number(this.aRouter.snapshot.paramMap.get('cantidadDeseada'));

    //this.cantidad = Number(this.aRouter.snapshot.paramMap.get('cantidad'));
    //this.cantidadDeseada = Number(this.aRouter.snapshot.paramMap.get('cantidadDeseada'));

    this.idCompraCreada = '';
  }

  ngOnInit(): void {
    if (this.idCompra == null) {
      this.compraForm.setValue({
        IDarticulo: this.idArticulo,
        IDcliente: '',
        cantidad: this.cantidadDeseada,
        nombreComprador: '',
        direccion: '',
      });
    }
    this.esEditar();
    console.log('ID articulo: ' + this.idArticulo);
    console.log('ID compra: ' + this.idCompra);
    this._productoService.getProductos();
  }

  //crear-compra/:id/:idcliente/:cantidad/:nombreComprador/:direccion

  agregarCompra() {
    const COMPRA: Compra = {
      IDarticulo: this.compraForm.get('IDarticulo')?.value,
      IDcliente: this.compraForm.get('IDcliente')?.value,
      nombreComprador: this.compraForm.get('nombreComprador')?.value,
      direccion: this.compraForm.get('direccion')?.value,
      cantidad: this.compraForm.get('cantidad')?.value,
    };

    if (this.idCompra != null) {
      //editamos compra
      //if (COMPRA.cantidad <= this.cantidad) {
      this._compraService.editarCompra(this.idCompra, COMPRA).subscribe(
        (data) => {
          this.toastr.info(
            'La compra fue actualizada con éxito',
            'Compra actualizada'
          );
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.compraForm.reset();
        }
      );
      //} else {
      //console.log('CANTIDAD editar: ' + this.cantidad);
      //this.toastr.error('Cantidad máxima alcanzada', 'Compra errónea');
      //this.router.navigate(['/']);
      //}
    } else {
      //agregamos compra
      console.log(COMPRA);
      console.log(COMPRA.cantidad);
      console.log('CANTIDAD MAXIMA');
      this._compraService.guardarCompra(COMPRA).subscribe(
        (data) => {
          this.idCompraCreada = data._id; // aquí guardamos la ID de la compra creada
          this.toastr.toastrConfig.easeTime = 100;
          this.toastr.success(
            'La compra fue registrada con éxito: ' + this.idCompraCreada,
            'Compra registrada'
          );
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.compraForm.reset();
        }
      );

      //restamos la cantidad al producto
      /*this._productoService.restarCantidadProducto(COMPRA.IDarticulo, COMPRA.cantidad).subscribe(
        (data) => {
          console.log('Cantidad restada del producto');
        },
        (error) => {
          console.log(error);
        }
      );*/
    }
  }

  esEditar() {
    if (this.idCompra != null) {
      this.titulo = 'Editar compra';
      this._compraService.obtenerCompra(this.idCompra).subscribe((data) => {
        this.compraForm.setValue({
          IDarticulo: data.IDarticulo,
          IDcliente: data.IDcliente,
          nombreComprador: data.nombreComprador,
          direccion: data.direccion,
          cantidad: data.cantidad,
        });
      });
      //consultar cantidad disponible del producto (IDarticulo) para actualizar cantidad
    }
  }
}
