import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Compra } from 'src/app/models/compra';
import { CompraService } from 'src/app/services/compra.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {
  listProductos: Producto[] = [];
  listCompras: Compra[] = [];
  listUsuarios: Usuario[] = [];
  idCompraCreada: any;
  //cantidadMax: Number;
  //compraForm: FormGroup<any> | Compra[] = [];
  constructor(private _productoService: ProductoService,
    private toastr: ToastrService,
    private _compraService: CompraService,
    private _usuarioService: UsuarioService,){ }

  ngOnInit(): void {
    //this.obtenerProductos();
    //this.obtenerCompras();

  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerCompras(){
    this._compraService.getCompras().subscribe(data => {
      console.log(data);
      this.listCompras = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any){
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error("El producto fue eliminado", "Producto eliminado")
      //this.obtenerProductos();
    }, error => {
      console.log(error)
    })
  }

  /*eliminarCompra(id: any){
    this._compraService.eliminarCompra(id).subscribe(data => {
      this.toastr.error("La compra fue eliminada", "Compra eliminada")
      //this.obtenerCompras();

      //this._productoService.eliminarProducto(data.IDarticulo);
    }, error => {
      console.log(error)
    })
  }*/

  eliminarCompra(idCompra: any, cantidadaborrar: any, idArticulo: any){
    this._compraService.eliminarCompra(idCompra).subscribe(data => {
      this.toastr.error("La compra fue eliminada", "Compra eliminada")
      this._productoService.obtenerProducto(idArticulo).subscribe(
        producto => {
          producto.cantidad = producto.cantidad + cantidadaborrar;
          this._productoService.editarProducto(idArticulo,producto).subscribe(
            data => {
              console.log(data);
              //this.obtenerCompras();
              //this.obtenerProductos();
            },
            error => {
              console.log(error);
            }
          )
        },
        error => {
          console.log(error);
        }
      );
      //this.obtenerCompras();

      //this._productoService.eliminarProducto(data.IDarticulo);
    }, error => {
      console.log(error)
    })
  }

  async esAdministrador(idUsuario: any): Promise<boolean> {
    try {
      const data = await this._usuarioService.getUsuarios().toPromise();
      this.listUsuarios = data.filter((usuario: Usuario) => usuario._id === idUsuario);
      const usuarioEncontrado = this.listUsuarios[0];
      if (usuarioEncontrado && usuarioEncontrado.rol === 'administrador') {
        console.log('es admin');
        //this.adminBotonNuevo=true;
        return true;
      } else {
        console.log('es cliente');
        //this.adminBotonNuevo=false;
        //this.router.navigate(['/admin']);
        return false;
      }
    } catch (error) {
      // Log any errors that occur to the console
      console.log(error);
      return false;
    }
  }

  async esCliente(idUsuario: any): Promise<boolean> {
    try {
      const data = await this._usuarioService.getUsuarios().toPromise();
      this.listUsuarios = data.filter((usuario: Usuario) => usuario._id === idUsuario);
      const usuarioEncontrado = this.listUsuarios[0];
      if (usuarioEncontrado && usuarioEncontrado.rol === 'cliente') {
        console.log('es cliente');
        //this.adminBotonNuevo=true;
        return true;
      } else {
        console.log('NO es cliente');
        //this.adminBotonNuevo=false;
        //this.router.navigate(['/admin']);
        return false;
      }
    } catch (error) {
      // Log any errors that occur to the console
      console.log(error);
      return false;
    }
  }

  async filtrarProductos(id: any, nombre: any, idUsuario: any) {

      const cliente = await this.esCliente(idUsuario);
      console.log("CLIENTE: "+cliente);

      if (!cliente) {
        this.listProductos = [];
        return;
      }
      //this.esAdministrador(idUsuario).then(admin => {
      //console.log("ADMIN: "+admin);

      if (id == '' && nombre == '' && cliente) {
        this.obtenerProductos();
      }

      if (id != '' && nombre == '' && cliente) {
        // Call the getProductos() method of the _productoService to fetch the list of products
        this._productoService.getProductos().subscribe(
          (data: any[]) => {
            // Log the fetched data to the console for debugging purposes
            console.log(data);

            // Filter the list of products based on the provided ID
            this.listProductos = data.filter((producto) => producto._id === id);
          },
          (error: any) => {
            // Log any errors that occur to the console
            console.log(error);
          }
        );
      }

      if (nombre != '' && id == '' && cliente) {
        // Call the getProductos() method of the _productoService to fetch the list of products
        this._productoService.getProductos().subscribe(
          (data: any[]) => {
            // Log the fetched data to the console for debugging purposes
            console.log(data);

            // Filter the list of products based on the provided name
            this.listProductos = data.filter(
              (producto) => producto.nombre === nombre
            );
          },
          (error: any) => {
            // Log any errors that occur to the console
            console.log(error);
          }
        );
      }

      if (nombre != '' && id != '' && cliente) {
        // Call the getProductos() method of the _productoService to fetch the list of products
        this._productoService.getProductos().subscribe(
          (data: any[]) => {
            // Log the fetched data to the console for debugging purposes
            console.log(data);

            // Filter the list of products based on the provided ID and name
            this.listProductos = data.filter(
              (producto) => producto._id === id && producto.nombre === nombre
            );
          },
          (error: any) => {
            // Log any errors that occur to the console
            console.log(error);
          }
        );
      }
    //});
  }

  filtrarCompra(idComprador: any){
    console.log("NOMBRE: " + idComprador);
    this._compraService.getCompras().subscribe(
      (data: any[]) => {
        // Log the fetched data to the console for debugging purposes
        console.log(data);

        // Filter the list of products based on the provided ID
        this.listCompras = data.filter(compra => compra.IDcliente === idComprador);
      },
      (error: any) => {
        // Log any errors that occur to the console
        console.log(error);
      }
    );
  }

  agregarCompra(IDproducto: any, IDcliente: any, cantidadDeseada: any, nombreCliente: any, direccion: any){
    const compra: Compra = {
      IDarticulo: IDproducto,
      IDcliente: IDcliente,
      cantidad: cantidadDeseada,
      nombreComprador: nombreCliente,
      direccion: direccion
    };
    this._compraService.guardarCompra(compra).subscribe(
      data => {
        this.idCompraCreada = data._id; // aquí guardamos la ID de la compra creada
        this.toastr.success('ID de la compra: ' + this.idCompraCreada, 'Compra realizada');
        this._productoService.obtenerProducto(IDproducto).subscribe(
          producto => {
            producto.cantidad = producto.cantidad - cantidadDeseada;
            this._productoService.editarProducto(producto._id,producto).subscribe(
              data => {
                console.log(data);
                //this.obtenerCompras();
                //this.obtenerProductos();
              },
              error => {
                console.log(error);
              }
            )
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

}
