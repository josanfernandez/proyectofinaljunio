import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
  mostrar_acciones:boolean

  constructor(private comunidadService: ComunidadService, private authService:AuthService) { }

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

  // Método que inserta las comunidades
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

  // Método que elimina las comunidades
  delete(comunidad: Comunidad): void {
    this.comunidades = this.comunidades.filter(j => j !== comunidad);
    this.comunidadService.eliminarComunidad(comunidad).subscribe();
  }

  // Método que inicializa la función de listar
  ngOnInit(): void {
    
    this.getComunidadApi();
    this.authService.getMessage().subscribe((data)=>{
      this.mostrar_acciones = data.is_loged
    })
  }

}
