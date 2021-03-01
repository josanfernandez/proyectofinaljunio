import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Municipio } from "./municipio";

@Injectable({
  providedIn: "root"
})

export class MunicipioService {
  private url = "https://restapicovid.herokuapp.com/municipios";

  constructor(private http: HttpClient) {}

  getMunicipioApi() {
    return this.http.get(this.url);
  }
  
  insertarMunicipio(doc: any) {
    return this.http.post(this.url, doc);
  }

  eliminarMunicipio(municipio: Municipio) {
    const urlId = `${this.url}/${municipio.id}`;
    return this.http.delete(urlId);
  }

}
