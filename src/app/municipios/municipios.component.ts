import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Provincia } from "../provincia";
import { ProvinciaService } from "../provincia.service";
import { Municipio } from "../municipio";
import { MunicipioService } from "../municipios.service";

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  constructor(private provinciaService: ProvinciaService, private municipioService: MunicipioService, private route: ActivatedRoute) { }

  municipios: Array<Municipio> = [];
  municipioApi = null;
  municipioTemp: any;
  municipio = null;

  provincias: Array<Provincia> = [];
  provinciaApi = null;
  provinciaTemp: any;

  // Método que devuelve todas los municipios desde la API
  getMunicipioApi() {
    this.municipioService.getMunicipioApi().subscribe(municipios => {
      this.municipioApi = municipios;
      for (let mun of this.municipioApi) {
        let c = new Municipio(
          mun.id,
          mun.provincia,
          mun.nombre,
          mun.confirmados,
          mun.recuperados,
          mun.criticos,
          mun.fallecidos,
        );
        this.municipios.push(c);
      }
    });
  }

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

  // Método que inserta los municipios
  insertarMunicipio(provincia: string, nombre: string, confirmados: string, recuperados: string, criticos: string, fallecidos: string) {

    const provinciaM = parseInt(provincia);
    const nombreM = nombre.trim();
    const confirmadosM = parseInt(confirmados);
    const recuperadosM = parseInt(recuperados);
    const criticosM = parseInt(criticos);
    const fallecidosM = parseInt(fallecidos);

    console.log(provinciaM);
    console.log(nombreM);
    console.log(confirmadosM);
    console.log(recuperadosM);
    console.log(criticosM);
    console.log(fallecidosM);

    if (!provinciaM || !nombreM || !confirmadosM || !recuperadosM || !criticosM || !fallecidosM) {
      return;
    }

    const newDoc: any = {
      provincia: provinciaM,
      nombre: nombreM,
      confirmados: confirmadosM,
      recuperados: recuperadosM,
      criticos: criticosM,
      fallecidos: fallecidosM,
    };

    this.municipioService.insertarMunicipio(newDoc).subscribe(municipio => {
      this.municipioTemp = newDoc;
      this.municipios.push(this.municipioTemp);
    });

  }

  // Método que elimina los municipios
  delete(municipio: Municipio): void {
    this.municipios = this.municipios.filter(j => j !== municipio);
    this.municipioService.eliminarMunicipio(municipio).subscribe();
  }

  // Método que inicializa la función de listar
  ngOnInit(): void {
    this.getMunicipioApi();
    this.getProvinciaApi();
  }

}
