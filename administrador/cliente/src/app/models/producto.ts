export class Producto{
  _id?: number;
  nombre: string;
  tipo: string;
  flores: string;
  frutal: string;
  cantidad: number;
  precio: number;

  constructor(nombre: string, tipo: string, flores: string, frutal: string, cantidad:number, precio:number){
    this.nombre=nombre;
    this.tipo=tipo;
    this.flores=flores;
    this.frutal=frutal;
    this.cantidad=cantidad;
    this.precio=precio;
  }
}
