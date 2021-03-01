import { Component, OnInit } from '@angular/core';
import { Comunidad } from "../comunidad";
import { ComunidadService } from "../comunidad.service";

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit {
  comunidades: Array<Comunidad> = [];
  comunidadApi = null;
  comunidadTemp: any;

  constructor(private comunidadService: ComunidadService) { }

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

  
  insertarComunidad(nombre: string) {

    const nombreC = nombre.trim(); 
    
    if (!nombreC) {
      return;
    }

    const newDoc: any = {  
      nombre: nombreC
    };

    this.comunidadService.insertarComunidad(newDoc).subscribe(comunidad => {
      this.comunidadTemp = newDoc;
      this.comunidades.push(this.comunidadTemp);
    });

  }

  delete(comunidad: Comunidad): void {
    this.comunidades = this.comunidades.filter(j => j !== comunidad);
    this.comunidadService.eliminarComunidad(comunidad).subscribe();
  }

  ngOnInit(): void {
    this.getComunidadApi();
  }

}
