export class Compra{
  _id?: number;
  IDarticulo: string;
  IDcliente: string;
  nombreComprador: string;
  direccion: string;
  cantidad: number;

  constructor(IDarticulo: string, IDcliente: string, nombreComprador: string, direccion: string, cantidad:number){
    this.IDarticulo=IDarticulo;
    this.IDcliente=IDcliente;
    this.nombreComprador=nombreComprador;
    this.direccion=direccion;
    this.cantidad=cantidad;
  }
}
