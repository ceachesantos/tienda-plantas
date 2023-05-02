import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent {
  listProductos: Producto[] = [];
  listUsuarios: Usuario[] = [];
  adminBotonNuevo: boolean | undefined;
  constructor(
    private _productoService: ProductoService,
    private _usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (data) => {
        console.log(data);
        this.listProductos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(
      (data) => {
        this.toastr.error('El producto fue eliminado', 'Producto eliminado');
        this.obtenerProductos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async esAdministrador(idUsuario: any): Promise<boolean> {
    try {
      const data = await this._usuarioService.getUsuarios().toPromise();
      this.listUsuarios = data.filter((usuario: Usuario) => usuario._id === idUsuario);
      const usuarioEncontrado = this.listUsuarios[0];
      if (usuarioEncontrado && usuarioEncontrado.rol === 'administrador') {
        console.log('es admin');
        this.adminBotonNuevo=true;
        return true;
      } else {
        console.log('es cliente');
        this.adminBotonNuevo=false;
        this.router.navigate(['/admin']);
        return false;
      }
    } catch (error) {
      // Log any errors that occur to the console
      console.log(error);
      return false;
    }
  }

  async filtrarProductos(id: any, nombre: any, idUsuario: any) {

      const admin = await this.esAdministrador(idUsuario);
      console.log("ADMIN: "+admin);

      if (!admin) {
        this.listProductos = [];
        return;
      }
      //this.esAdministrador(idUsuario).then(admin => {
      //console.log("ADMIN: "+admin);

      else if (id == '' && nombre == '' && admin) {
        this.obtenerProductos();
      }

      else if (id != '' && nombre == '' && admin) {
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

      else if (nombre != '' && id == '' && admin) {
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

      else if (nombre != '' && id != '' && admin) {
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


  /*filtrarProductos(id: any, nombre: any, idUsuario: any) {
    let admin = this.esAdministrador(idUsuario);
    console.log("ADMIN: "+admin);

    if (id == '' && nombre == '') {
      this.obtenerProductos();
    }

    if (id != '' && nombre == '') {
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

    if (nombre != '' && id == '') {
      // Call the getProductos() method of the _productoService to fetch the list of products
      this._productoService.getProductos().subscribe(
        (data: any[]) => {
          // Log the fetched data to the console for debugging purposes
          console.log(data);

          // Filter the list of products based on the provided ID
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

    if (nombre != '' && id != '') {
      // Call the getProductos() method of the _productoService to fetch the list of products
      this._productoService.getProductos().subscribe(
        (data: any[]) => {
          // Log the fetched data to the console for debugging purposes
          console.log(data);

          // Filter the list of products based on the provided ID
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
  }*/

  /*esAdministrador(idUsuario: any): boolean {
    let esAdmin = false;
    this._usuarioService.getUsuarios().subscribe(
      (data: any[]) => {
        // Log the fetched data to the console for debugging purposes
        console.log(data);

        // Filter the list of products based on the provided ID
        this.listUsuarios = data.filter((usuario) => usuario._id === idUsuario);
        const usuarioEncontrado = this.listUsuarios[0];
        if (usuarioEncontrado && usuarioEncontrado.rol === 'administrador') {
          console.log('es admin');
          esAdmin = true;
          return true;
        } else {
          console.log('es cliente');
          esAdmin = false;
          return false;
        }
      },
      (error: any) => {
        // Log any errors that occur to the console
        console.log(error);
        esAdmin = false;
      }
    );
    console.log(esAdmin);
    return esAdmin;
  }*/

  /*esAdministrador(idUsuario: any): boolean {
    let esAdmin = false;
    this._usuarioService.getUsuarios().subscribe(
      (data: any[]) => {
        // Log the fetched data to the console for debugging purposes
        console.log(data);

        // Filter the list of products based on the provided ID
        this.listUsuarios = data.filter((usuario) => usuario._id === idUsuario);
        const usuarioEncontrado = this.listUsuarios[0];
        if (usuarioEncontrado && usuarioEncontrado.rol === 'administrador') {
          console.log('es admin');
          esAdmin = true;
          return true;
        } else {
          console.log('es cliente');
          esAdmin = false;
          return false;
        }
      },
      (error: any) => {
        // Log any errors that occur to the console
        console.log(error);
        esAdmin = false;
      }
    );
    console.log(esAdmin);
    return esAdmin;
  }*/

}
