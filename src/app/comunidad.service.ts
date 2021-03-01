import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comunidad } from "./comunidad";

@Injectable({
  providedIn: "root"
})

export class ComunidadService {
  private url = "https://restapicovid.herokuapp.com/comunidades";

  constructor(private http: HttpClient) {}

  getComunidadApi() {
    return this.http.get(this.url);
  }
  
  insertarComunidad(doc: any) {
    return this.http.post(this.url, doc);
  }

  eliminarComunidad(comunidad: Comunidad) {
    const urlId = `${this.url}/${comunidad.id}`;
    return this.http.delete(urlId);
  }

}
