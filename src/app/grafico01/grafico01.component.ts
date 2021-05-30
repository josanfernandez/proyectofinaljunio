import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { MunicipioService } from "../municipios.service";

@Component({
  selector: "app-grafico01",
  templateUrl: "./grafico01.component.html",
  styleUrls: ["./grafico01.component.css"]
})

// Clase que implementa los Gráficos de Barras
export class Grafico01Component implements OnInit {

  // Llamada a la librería de gráficos Highcharts
  Highcharts: typeof Highcharts = Highcharts;

  // Creación de una variable conlos valores por defecto de la gráfica 1 (Confirmados por municipios)
  chartOptions: Highcharts.Options = {
    chart: {
      type: "column"
    },
    xAxis: {
      categories: []
    },
    title: {
      text: "Confirmados por municipios", // Título de la Gráfica 1
      style: { // Estilos de los textos del título
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },
    series: [
      {
        type: "column",
        name: "Confirmados", // Título de la leyenda de la Gráfica 1
        data: [],
        color: "blue"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  // Creación de una variable con los valores por defecto de la gráfica 2 (Fallecidos por municipios)
  chartOptions2: Highcharts.Options = {
    chart: {
      type: "column"
    },
    xAxis: {
      categories: []
    },
    title: {
      text: "Fallecidos por municipios",  // Título de la Gráfica 2
      style: { // Estilos de los textos del título
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },
    series: [
      {
        type: "column",
        name: "Fallecidos",  // Título de la leyenda de la Gráfica 2
        data: [],
        color: "red"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  // Constructor de la clase
  constructor(private municipiosService: MunicipioService) {}

  // Método que iniciializa las gráficas y las devuelve en el HTML
  ngOnInit() {
    this.confirmadosMunicipios()
    this.fallecidosMunicipios()
  }

  // Método que nos devuelve la información (data) para llenar los valores de la gráfica 1
  confirmadosMunicipios() {

    this.municipiosService.getMunicipioApi()
    .subscribe(
      result =>{
        const confirmados: any = result;
        const dataSeriesConfirmados = confirmados.map((y: any) => y.confirmados); // Eje Y
        const dataCategoriasConfirmados = confirmados.map((x: any) => x.nombre); // Eje x
        this.chartOptions.series[0]["data"] = dataSeriesConfirmados;
        this.chartOptions.xAxis["categories"] = dataCategoriasConfirmados;

         // imprime los valores y la variable de inicialización sobre el div con id= miGrafico1
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error) // Devuelve el error en caso de existir un problema previo
    );
  }

  // Método que nos devuelve la información (data) para llenar los valores de la gráfica 2
  fallecidosMunicipios() {

    this.municipiosService.getMunicipioApi()
    .subscribe(
      result =>{
        const fallecidos: any = result;
        const dataSeriesFallecidos = fallecidos.map((y: any) => y.fallecidos); // Eje Y
        const dataCategoriasFallecidos = fallecidos.map((x: any) => x.nombre); // Eje x
        this.chartOptions2.series[0]["data"] = dataSeriesFallecidos;  
        this.chartOptions2.xAxis["categories"] = dataCategoriasFallecidos;

        // imprime los valores y la variable de inicialización sobre el div con id= miGrafico2
        Highcharts.chart("miGrafico02", this.chartOptions2);
      },
      error => console.log(error)  // Devuelve el error en caso de existir un problema previo
    );
  }

}