import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Provincia } from "./provincia";

@Injectable({
  providedIn: "root"
})

export class ProvinciaService {
  private url = "https://restapicovid.herokuapp.com/provincias";

  constructor(private http: HttpClient) {}

  getProvinciaApi() {
    return this.http.get(this.url);
  }
  
  insertarProvincia(doc: any) {
    return this.http.post(this.url, doc);
  }

  eliminarProvincia(provincia: Provincia) {
    const urlId = `${this.url}/${provincia.id}`;
    return this.http.delete(urlId);
  }

}
