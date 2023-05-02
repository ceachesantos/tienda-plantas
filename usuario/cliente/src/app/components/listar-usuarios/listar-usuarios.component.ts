import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import * as mongoose from 'mongoose';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  listUsuarios: Usuario[] = [];
  //cantidadMax: Number;
  //compraForm: FormGroup<any> | Compra[] = [];
  constructor(private _usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,){ }

  ngOnInit(): void {
    //this.obtenerUsuarios();
  }

  obtenerListaUsuarios(){
    this._usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  async esUsuario(idUsuario: any): Promise<boolean> {
    try {
      const data = await this._usuarioService.getUsuarios().toPromise();
      this.listUsuarios = data.filter((usuario: Usuario) => usuario._id === idUsuario);
      const usuarioEncontrado = this.listUsuarios[0];
      if (usuarioEncontrado && usuarioEncontrado.rol === 'administrador') {
        console.log('es admin');
        return true;
      } else {
        console.log('es cliente');
        return true;
      }
    } catch (error) {
      // Log any errors that occur to the console
      console.log(error);
      return false;
    }
  }

  async obtenerUsuarios(idUsuario: string) {
    const usuario = await this.esUsuario(idUsuario);
    if(!usuario){
      console.log("no hay usuario con esta ID");
      this.toastr.error("No hay usuario con esta ID", "ID no válida")
      return;
    }

    // Check if the idUsuario is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(idUsuario)) {
      console.log('Invalid ObjectId');
      this.toastr.error("Formato incorrecto", "ID no válida")
      this.listUsuarios=[];
      return;
    }

    // Obtener el usuario actual por su _id
    this._usuarioService.obtenerUsuario(idUsuario).subscribe(usuario => {
      // Comprobar si el usuario es administrador
      if (usuario.rol === 'administrador') {
        // Si el usuario es administrador, obtener la lista de usuarios
        this._usuarioService.getUsuarios().subscribe(data => {
          console.log(data);
          this.listUsuarios = data;
        }, error => {
          console.log(error);
        });
      } else {
        // Si el usuario no es administrador, mostrar un mensaje de error o redirigir a otra página
        console.log('No tienes permiso para acceder a esta lista');
        this.toastr.error("No tienes permiso para acceder a esta lista", "Permisos incorrectos")
        this.listUsuarios=[];
      }
    }, error => {
      console.log(error);
    });
  }

  //con esta funcion actualizo la lista de usuarios al eliminar
  eliminarUsuario(id: any){
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ObjectId');
      this.toastr.error("Formato incorrecto", "ID no válida")
      this.listUsuarios=[];
      return;
    }
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado", "Usuario eliminado")
      const index = this.listUsuarios.findIndex(usuario => usuario._id === id);
      this.listUsuarios.splice(index, 1);
    }, error => {
      console.log(error)
    })
  }


  /*eliminarUsuario(id: any){
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ObjectId');
      this.toastr.error("Formato incorrecto", "ID no válida")
      this.listUsuarios=[];
      return;
    }
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado", "Usuario eliminado")
      //this.obtenerUsuarios("");
      this.router.navigate(['/']);
    }, error => {
      console.log(error)
    })
  }*/

  filtrarUsuario(rol: any){
    console.log("NOMBRE: " + rol);
    this._usuarioService.getUsuarios().subscribe(
      (data: any[]) => {
        // Log the fetched data to the console for debugging purposes
        console.log(data);

        // Filter the list of products based on the provided ID
        this.listUsuarios = data.filter(usuario => usuario.rol === rol);
      },
      (error: any) => {
        // Log any errors that occur to the console
        console.log(error);
      }
    );
  }

  agregarUsuario(rol: any){
    const USUARIO: Usuario = {
      rol: rol,
    };
    this._usuarioService.guardarUsuario(USUARIO).subscribe(
      data => {
        this.toastr.success('ID: ' + data._id, 'Usuario creado');
      },
      error => {
        console.log(error);
      }
    );
  }

}
