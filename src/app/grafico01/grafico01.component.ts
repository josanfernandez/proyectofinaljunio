import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { MunicipioService } from "../municipios.service";


@Component({
  selector: "app-grafico01",
  templateUrl: "./grafico01.component.html",
  styleUrls: ["./grafico01.component.css"]
})
export class Grafico01Component implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column"
    },
    xAxis: {
      categories: []
    },
    title: {
      text: "Confirmados por municipios",
      style: {
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },
    series: [
      {
        type: "column",
        name: "Confirmados",
        data: [],
        color: "grey"
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

  chartOptions2: Highcharts.Options = {
    chart: {
      type: "column"
    },
    xAxis: {
      categories: []
    },
    title: {
      text: "Fallecidos por municipios",
      style: {
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },
    series: [
      {
        type: "column",
        name: "Fallecidos",
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

  constructor(private municipiosService: MunicipioService) {}

  ngOnInit() {
    this.confirmadosMunicipios()
    this.fallecidosMunicipios()
  }

  confirmadosMunicipios() {

    this.municipiosService.getMunicipioApi()
    .subscribe(
      result =>{
        const confirmados: any = result;
        const dataSeriesConfirmados = confirmados.map((x: any) => x.confirmados);
        const dataCategoriasConfirmados = confirmados.map((x: any) => x.nombre);
        this.chartOptions.series[0]["data"] = dataSeriesConfirmados;
        this.chartOptions.xAxis["categories"] = dataCategoriasConfirmados;
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }

  fallecidosMunicipios() {

    this.municipiosService.getMunicipioApi()
    .subscribe(
      result =>{
        const fallecidos: any = result;
        const dataSeriesFallecidos = fallecidos.map((x: any) => x.fallecidos);
        const dataCategoriasFallecidos = fallecidos.map((x: any) => x.nombre);
        this.chartOptions2.series[0]["data"] = dataSeriesFallecidos;
        this.chartOptions2.xAxis["categories"] = dataCategoriasFallecidos;
        Highcharts.chart("miGrafico02", this.chartOptions2);
      },
      error => console.log(error)
    );
  }

}
