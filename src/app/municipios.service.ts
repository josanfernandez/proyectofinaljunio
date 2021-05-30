import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Municipio } from "./municipio";

@Injectable({
  providedIn: "root"
})
// Creación y llamada de los métodos/servicios Listar, Crear y eliminar Municipios

export class MunicipioService {

  // Url generada por heroku para nuestro servicio de municipios
  private url = "https://restapicovid.herokuapp.com/municipios";

  constructor(private http: HttpClient) { }

  // Listado de municipios API
  getMunicipioApi() {
    return this.http.get(this.url);
  }

  // Insertar de municipios API
  insertarMunicipio(doc: any) {
    return this.http.post(this.url, doc);
  }

  // Eliminar de municipios API
  eliminarMunicipio(municipio: Municipio) {
    const urlId = `${this.url}/${municipio.id}`;
    return this.http.delete(urlId);
  }  
  
  getMunicipio(id: String) {
    const url =  `${this.url}/municipios/${id}`;
    return this.http.get(url);
  }

  updateMunicipio(doc: any) {
    const url = `${this.url}/municipios/${doc.id}`;
    return this.http.post(url, doc);
  }


}
