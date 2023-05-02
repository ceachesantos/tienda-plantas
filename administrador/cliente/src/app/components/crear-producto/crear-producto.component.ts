import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute){
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      tipo: ['', Validators.required],
      flores: ['', Validators.required],
      frutal: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void{
    this.esEditar();
  }

  agregarProducto(){
    //console.log(this.productoForm);

    //console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      tipo: this.productoForm.get('tipo')?.value,
      flores: this.productoForm.get('flores')?.value,
      frutal: this.productoForm.get('frutal')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if(this.id !== null){
      //editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
      this.toastr.info('El producto fue actualizado con éxito', 'Producto actualizado');
      this.router.navigate(['/admin']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
    else{
      //agregamos producto
      console.log(PRODUCTO);

      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con éxito', 'Producto registrado');
      this.router.navigate(['/admin']);
      }, error => {
      console.log(error);
      this.productoForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id != null){
      this.titulo = "Editar producto";
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          tipo: data.tipo,
          flores: data.flores,
          frutal: data.frutal,
          cantidad: data.cantidad,
          precio: data.precio,
        })
      })
    }
  }

}
