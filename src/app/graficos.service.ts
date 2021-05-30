import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})

export class GraficosService {

    constructor(private http:HttpClient){}

    public load_data()
    {
        return this.http.get('http://localhost:4000/api/land')
    }
}