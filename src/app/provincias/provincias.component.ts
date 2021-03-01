import { Component, OnInit } from '@angular/core';
import { Provincia } from "../provincia";
import { Comunidad } from "../comunidad";
import { ComunidadService } from "../comunidad.service";

import { ProvinciaService } from "../provincia.service";

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {
  
  constructor(private provinciaService: ProvinciaService, private comunidadService: ComunidadService) { }

  provincias: Array<Provincia> = [];
  provinciaApi = null;
  provinciaTemp: any;

  comunidades: Array<Comunidad> = [];
  comunidadApi = null;
  comunidadTemp: any;

  // Método que devuelve todas las provincias desde la API
  getProvinciaApi() {
    this.provinciaService.getProvinciaApi().subscribe(provincias => {
      this.provinciaApi = provincias;
      for (let prov of this.provinciaApi) {
        let c = new Provincia(
          prov.id,
          prov.comunidad,
          prov.nombre,
          prov.habitantes,
        );        
        this.provincias.push(c);
      }
    });
  }
// Método que devuelve todas las comunidades desde la API
  getComunidadApi() {
    this.comunidadService.getComunidadApi().subscribe(comunidades => {
      this.comunidadApi = comunidades;
      for (let com of this.comunidadApi) {
        let c = new Comunidad(
          com.id,
          com.nombre
        );
        this.comunidades.push(c);
      }
    });
  }

  // Método que inserta las provincias
  insertarProvincia(comunidad:string, nombre: string, habitantes:string) {
   
    const comunidadP = parseInt(comunidad); 
    const nombreP = nombre.trim(); 
    const habitantesP = parseInt(habitantes); 
    
    
    if (!nombreP || !comunidadP || !habitantesP) {
      return;
    }

    const newDoc: any = {  
      comunidad: comunidadP,
      nombre: nombreP,
      habitantes: habitantesP
    };

    this.provinciaService.insertarProvincia(newDoc).subscribe(provincia => {
      this.provinciaTemp = newDoc;
      this.provincias.push(this.provinciaTemp);
    });

  }

  // Método que elimina las provincias
  delete(provincia: Provincia): void {
    this.provincias = this.provincias.filter(j => j !== provincia);
    this.provinciaService.eliminarProvincia(provincia).subscribe();
  }

  // Método que inicializa la función de listar
  ngOnInit(): void {
    this.getProvinciaApi();
    this.getComunidadApi();
  }

}
